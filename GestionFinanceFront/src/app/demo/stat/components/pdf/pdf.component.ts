import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import 'jspdf-barcode';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  expanses: any[] = [];
  totalMontant:any
  @ViewChild('pdfTemplate', { static: false })
  pdfTemplate!: ElementRef;
constructor(private route: ActivatedRoute){

}
ngOnInit(): void {
  const navigationState = window.history.state;
    if (navigationState) {
      this.expanses = navigationState.expanses;
      this.calculateTotalMontant()
    }
    console.log(this.expanses)
}
calculateTotalMontant(): void {
  this.totalMontant = this.expanses.reduce((acc, cur) => acc + cur.montant, 0);
}
download() {
  const doc = new jsPDF();
  const pdfTemplate = this.pdfTemplate.nativeElement;

  html2canvas(pdfTemplate).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
    doc.save('Certification.pdf');
  });



}
}
