import { Component, OnInit, ViewChild } from '@angular/core';
import { Transfer } from '../../model/transfer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TransferService } from '../../service/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Recharge } from 'src/app/recharge/model/recharge';
import { RechargeService } from 'src/app/recharge/service/recharge.service';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
})
export class TransferListComponent implements OnInit {
  codeId: string;
  //transfers
  TRANSFERS: Transfer[];
  dataSource = new MatTableDataSource<Transfer>(this.TRANSFERS);
  displayedColumns: string[] = [
    'debiteur',
    'creancier',
    'somme',
    'date',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // Recharges
  RECHARGES: Recharge[];
  dataSource2 = new MatTableDataSource<Recharge>(this.RECHARGES);
  displayedColumns2: string[] = [
    'client',
    'operateur',
    'numero',
    'somme',
    'date',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator2: MatPaginator;

  constructor(
    private transferService: TransferService,
    private rechargeService: RechargeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.codeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    //transfer
    this.transferService.findAll(this.codeId).subscribe(
      (data) => {
        console.log('fshkel');
        this.TRANSFERS = data;

        this.dataSource = new MatTableDataSource<Transfer>(this.TRANSFERS);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.dataSource = new MatTableDataSource<Transfer>(null);
      }
    );
    //recharge
    this.rechargeService.findAll(this.codeId).subscribe(
      (data) => {
        this.RECHARGES = data;
        this.dataSource2 = new MatTableDataSource<Recharge>(this.RECHARGES);
        this.dataSource2.paginator = this.paginator2;
      },
      (error) => {
        this.dataSource2 = new MatTableDataSource<Recharge>(null);
      }
    );
  }
  checkSender(name: string) {
    if (sessionStorage.getItem('name') === name) {
      return true;
    }
    {
      return false;
    }
  }

  getPDF(invoiceId: number) {
    this.transferService.getPDF(invoiceId).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        // if you want to open PDF in new tab
        window.open(fileURL);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';

        a.download = 'Virement ' + invoiceId + '.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('getPDF error: ', error);
      }
    );
  }
}
