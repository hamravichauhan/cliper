import time
import threading
from enum import Enum
from typing import Callable, Any, TypeVar, Optional

T = TypeVar("T")

class CircuitState(str, Enum):
    CLOSED = "closed"       # Normal operation: all requests routed
    OPEN = "open"           # Tripped: requests fail-fast to fallback
    HALF_OPEN = "half_open" # Probe: allows 1 test request after cooldown

class CircuitBreakerOpenException(Exception):
    """Raised when request is rejected because circuit is open."""
    pass

class CircuitBreaker:
    """
    3-state circuit breaker for local LLM (Ollama) calls.
    - CLOSED: LLM requests execute normally with strict timeout.
    - OPEN: If call times out (>8s) or fails, trips to OPEN for cooldown (60s).
    - HALF-OPEN: After cooldown, permits 1 probe request.
                 Success -> transitions to CLOSED.
                 Failure -> transitions back to OPEN (resets cooldown).
    Thread-safe in-process state machine.
    """
    def __init__(self, timeout_sec: float = 8.0, cooldown_sec: float = 60.0):
        self.timeout_sec = timeout_sec
        self.cooldown_sec = cooldown_sec
        self._state = CircuitState.CLOSED
        self._last_failure_time: float = 0.0
        self._probe_allowed: bool = False
        self._lock = threading.Lock()

    @property
    def state(self) -> CircuitState:
        with self._lock:
            if self._state == CircuitState.OPEN:
                if time.time() - self._last_failure_time >= self.cooldown_sec:
                    self._state = CircuitState.HALF_OPEN
                    self._probe_allowed = True
            return self._state

    def record_success(self):
        with self._lock:
            self._state = CircuitState.CLOSED
            self._probe_allowed = False
            self._last_failure_time = 0.0

    def record_failure(self):
        with self._lock:
            self._state = CircuitState.OPEN
            self._probe_allowed = False
            self._last_failure_time = time.time()

    def can_execute(self) -> bool:
        """Check whether a request is permitted to proceed (permits exactly 1 probe in HALF_OPEN)."""
        with self._lock:
            if self._state == CircuitState.OPEN:
                if time.time() - self._last_failure_time >= self.cooldown_sec:
                    self._state = CircuitState.HALF_OPEN
                    self._probe_allowed = True

            if self._state == CircuitState.CLOSED:
                return True
            elif self._state == CircuitState.HALF_OPEN:
                if self._probe_allowed:
                    self._probe_allowed = False
                    return True
                return False
            return False

    def reset(self):
        with self._lock:
            self._state = CircuitState.CLOSED
            self._probe_allowed = False
            self._last_failure_time = 0.0

# Process-wide singleton circuit breaker for Ollama LLM
ollama_circuit_breaker = CircuitBreaker(timeout_sec=8.0, cooldown_sec=60.0)
