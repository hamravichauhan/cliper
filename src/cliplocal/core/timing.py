import time
from typing import Dict
from rich.console import Console
from rich.table import Table

console = Console()

class StageTimer:
    def __init__(self):
        self.timings: Dict[str, float] = {}
        self._current_stage: str | None = None
        self._stage_start: float = 0.0

    def start_stage(self, stage_name: str):
        if self._current_stage:
            self.end_stage()
        self._current_stage = stage_name
        self._stage_start = time.perf_counter()

    def end_stage(self):
        if self._current_stage:
            elapsed = time.perf_counter() - self._stage_start
            self.timings[self._current_stage] = round(elapsed, 3)
            self._current_stage = None

    def print_report(self):
        table = Table(title="⏱️ ClipLocal Pipeline Stage Performance Report", header_style="bold cyan")
        table.add_column("Pipeline Stage", style="dim", width=25)
        table.add_column("Duration (seconds)", justify="right")
        table.add_column("Duration (formatted)", justify="right")

        total = sum(self.timings.values())
        for stage, dur in self.timings.items():
            mins = int(dur // 60)
            secs = dur % 60
            table.add_row(stage, f"{dur:.2f}s", f"{mins}m {secs:.1f}s" if mins > 0 else f"{secs:.1f}s")
        
        table.add_section()
        table.add_row("Total Processing Time", f"[bold green]{total:.2f}s[/]", f"[bold green]{int(total//60)}m {total%60:.1f}s[/]")
        console.print(table)
