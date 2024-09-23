## Task 18
## task18.py
class ReportGenerator:
    def generate_pdf(self, data):
        ## replace generate_pdf
        print("Generating PDF...")
        # Complex PDF generation logic
        print("PDF generated!")
        ## with
        self._generate_report("PDF", data)
        ## end

    def generate_csv(self, data):
        ## replace generate_csv
        print("Generating CSV...")
        # Complex CSV generation logic
        print("CSV generated!")
        ## with
        self._generate_report("CSV", data)
        ## end
## add
    def _generate_report(self, report_type, data):
        print(f"Generating {report_type}...")
        # Complex {report_type} generation logic
        print(f"{report_type} generated!")
## end

data = {"name": "John", "score": 90}
report = ReportGenerator()
report.generate_pdf(data)
report.generate_csv(data)
