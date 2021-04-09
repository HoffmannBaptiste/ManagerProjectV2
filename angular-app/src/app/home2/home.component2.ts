import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

// import { User } from '@app/_models';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ResearchBDDService } from '../services/research-bdd.service';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Router,RouterModule,ActivatedRoute} from '@angular/router';
import {} from '@angular/router';
import { delay } from 'q';
//import * as $ from 'jquery';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {TableToExcel} from "@linways/table-to-excel";
import * as TableExport from "tableexport";

@Component({
  selector: 'app-home2',
  templateUrl: './home.component2.html',
  styleUrls: ['./home.component2.css']
})
export class HomeComponent2 implements OnInit {
    ws;
    wb : any;
    wbout;
    NgForm: FormGroup;
    loading = false;
    users: any[];
    uservalue: any[];
    userinfos: any;
    ligneChiffrageProjets: string[];
    ligneannee : any[]
    chargecomplets: any[];
    usertest : string;
    anneetest : string;
    calcul: any;
    index: any;
    mois : any;
    leannee : any;
    index2 : any;
    selectannee : any;
    nouveauchargecomplets : any[];
    index3 : any;
    index4 : any;
    enleve : any;
    monannee : any;
    display : boolean;
    displaypercent : boolean;
    reloadornot : any;
    index5 : any;
    totalpercentjanvier : any;
    totalpercentfevrier : any;
    totalpercentmars : any;
    totalpercentavril : any;
    totalpercentmai : any;
    totalpercentjuin : any;
    totalpercentjuillet : any;
    totalpercentaout : any;
    totalpercentseptembre : any;
    totalpercentoctobre : any;
    totalpercentnovembre : any;
    totalpercentdecembre : any;
    totaljanvier : any;
    totalfevrier : any;
    totalmars : any;
    totalavril : any;
    totalmai : any;
    totaljuin : any;
    totaljuillet : any;
    totalaout : any;
    totalseptembre : any;
    totaloctobre : any;
    totalnovembre : any;
    totaldecembre : any;
    jourtravails : any;
    formatter : any;
    csvFile : any;
    downloadLink : any;
    csv ;
    rows ;
    fileName : any;
    utilisateurs : any[];
    index10 : any;
    arrayusers :any[];

    constructor(private fb: FormBuilder, private userService: UserService, private authenticationService: AuthenticationService, private authvalue: AuthenticationService, private get_listcharge: ResearchBDDService,private fctbdd: ResearchBDDService) { this.userinfos = this.authenticationService.currentUserValue;}

    ngOnInit() {

      this.fileName= 'ExcelSheet.xlsx';
      this.jourtravails = 21;
      this.totaljanvier = 0;
      this.totalpercentjanvier = 0;
      this.reloadornot = 0 ;
      this.nouveauchargecomplets = new Array();
      this.index3 = 0;
      this.index4 = 0;
      this.selectannee = "non";
      this.index = 0;
      this.calcul = 78;
      this.usertest = "michel";
      this.anneetest = "2021"
      this.mois = "janvier"
        this.loading = false;
        this.uservalue = this.authvalue.currentUserValue;


        this.NgForm = this.fb.group({

            // Initialisation des champs
            monannee: ['',
                [
                  Validators.required,
                  Validators.maxLength(250),
                ]
            ],
            monchoix: ['',
                [

                ]
            ],
          });

          this.fctbdd.getUtilisateurs().subscribe((data2: string[]) => {
            this.utilisateurs = data2;
            console.log(this.utilisateurs);
            // for (const iterator of this.utilisateurs) {
            //   console.log(Object.keys(iterator).map(key => iterator[key]));
            // }
          });




    }

onSubmit2() {
  //On recupere le tableau des charge
  this.arrayusers = [];
if (this.NgForm.value.monchoix === true) {
  this.totaljanvier = 0;
  this.totalfevrier =0;
  this.totalmars = 0;
  this.totalavril = 0;
  this.totalmai = 0;
  this.totaljuin = 0;
  this.totaljuillet = 0;
  this.totalaout = 0;
  this.totalseptembre = 0;
  this.totaloctobre = 0;
  this.totalnovembre = 0;
  this.totaldecembre = 0;
  console.log(this.NgForm.value.monchoix);
  this.get_listcharge.getlistcharge().subscribe((data3: string[]) => {
    this.chargecomplets = data3;
    this.index2 = 0;
    //En fonction de l'année choisi, on itère sur le tableau et on supprime les lignes qui ne correspondent pas à l'année choisie
    while (this.index2 < this.chargecomplets.length) {
      if (this.chargecomplets[this.index2].annee_charge != this.NgForm.value.monannee) {
        this.chargecomplets.splice(this.index2, 1);
        console.log("On rentre bien dans la boucle");
      } else {
        ++this.index2;
      }
    }
    //return this.chargecomplets;
    console.log("VOICI APRES LA SUPRRESION :", this.chargecomplets);
    //Permet d'afficher le tableauProjets
    for (this.index5 = 0; this.index5 < this.chargecomplets.length; this.index5++) {
      this.totaljanvier = this.totaljanvier + this.chargecomplets[this.index5].janvier_charge;
      this.totalfevrier = this.totalfevrier + this.chargecomplets[this.index5].fevrier_charge;
      this.totalmars = this.totalmars + this.chargecomplets[this.index5].mars_charge;
      this.totalavril = this.totalavril + this.chargecomplets[this.index5].avril_charge;
      this.totalmai = this.totalmai + this.chargecomplets[this.index5].mai_charge;
      this.totaljuin = this.totaljuin + this.chargecomplets[this.index5].juin_charge;
      this.totaljuillet = this.totaljuillet + this.chargecomplets[this.index5].juillet_charge;
      this.totalaout = this.totalaout + this.chargecomplets[this.index5].aout_charge;
      this.totalseptembre = this.totaljuin + this.chargecomplets[this.index5].septembre_charge;
      this.totaloctobre = this.totaloctobre + this.chargecomplets[this.index5].octobre_charge;
      this.totalnovembre = this.totalnovembre + this.chargecomplets[this.index5].novembre_charge;
      this.totaldecembre = this.totaldecembre + this.chargecomplets[this.index5].decembre_charge;


    }
    console.log("Voici l'index 5.1",this.index5);
    console.log("Voici le total", this.totaljanvier);
    this.totaljanvier = (this.totaljanvier/this.index5).toFixed(1);
    this.totalfevrier = (this.totalfevrier/this.index5).toFixed(1);
    this.totalmars = (this.totalmars/this.index5).toFixed(1);
    this.totalavril = (this.totalavril/this.index5).toFixed(1);
    this.totalmai = (this.totalmai/this.index5).toFixed(1);
    this.totaljuin = (this.totaljuin/this.index5).toFixed(1);
    this.totaljuillet = (this.totaljuillet/this.index5).toFixed(1);
    this.totalaout = (this.totalaout/this.index5).toFixed(1);
    this.totalseptembre = (this.totalseptembre/this.index5).toFixed(1);
    this.totaloctobre = (this.totaloctobre/this.index5).toFixed(1);
    this.totalnovembre = (this.totalnovembre/this.index5).toFixed(1);
    this.totaldecembre = (this.totaldecembre/this.index5).toFixed(1);
    this.display = true;
    this.displaypercent = false;
    this.AffichageUsers();

    });
    }
    else {
      this.totalpercentjanvier = 0;
      this.totalpercentfevrier = 0;
      this.totalpercentmars = 0;
      this.totalpercentavril = 0;
      this.totalpercentmai = 0;
      this.totalpercentjuin = 0;
      this.totalpercentjuillet = 0;
      this.totalpercentaout = 0;
      this.totalpercentseptembre = 0;
      this.totalpercentoctobre = 0;
      this.totalpercentnovembre = 0;
      this.totalpercentdecembre = 0;
      console.log(this.NgForm.value.monchoix);
      this.get_listcharge.getlistcharge().subscribe((data6: string[]) => {
        this.chargecomplets = data6;

        this.index2 = 0;
        //En fonction de l'année choisi, on itère sur le tableau et on supprime les lignes qui ne correspondent pas à l'année choisie
        while (this.index2 < this.chargecomplets.length) {
          if (this.chargecomplets[this.index2].annee_charge != this.NgForm.value.monannee) {
            this.chargecomplets.splice(this.index2, 1);
            console.log("On rentre bien dans la boucle");
          }
          else {
            this.chargecomplets[this.index2].janvier_charge = ((this.chargecomplets[this.index2].janvier_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].fevrier_charge = ((this.chargecomplets[this.index2].fevrier_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].mars_charge = ((this.chargecomplets[this.index2].mars_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].avril_charge = ((this.chargecomplets[this.index2].avril_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].mai_charge = ((this.chargecomplets[this.index2].mai_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].juin_charge = ((this.chargecomplets[this.index2].juin_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].juillet_charge = ((this.chargecomplets[this.index2].juillet_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].aout_charge = ((this.chargecomplets[this.index2].aout_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].septembre_charge = ((this.chargecomplets[this.index2].septembre_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].octobre_charge = ((this.chargecomplets[this.index2].octobre_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].novembre_charge = ((this.chargecomplets[this.index2].novembre_charge * 100)/21).toFixed(0);
            this.chargecomplets[this.index2].decembre_charge = ((this.chargecomplets[this.index2].decembre_charge * 100)/21).toFixed(0);
            ++this.index2;
          }
        }
        //return this.chargecomplets;
        console.log("VOICI APRES LA SUPRRESION :", this.chargecomplets);
        //Permet d'afficher le tableauProjets
        for (this.index5 = 0; this.index5 < this.chargecomplets.length; this.index5++) {
          this.totalpercentjanvier = Number(this.totalpercentjanvier) + Number(this.chargecomplets[this.index5].janvier_charge);
          this.totalpercentfevrier = Number(this.totalpercentfevrier) + Number(this.chargecomplets[this.index5].fevrier_charge);
          this.totalpercentmars = Number(this.totalpercentmars) + Number(this.chargecomplets[this.index5].mars_charge);
          this.totalpercentavril = Number(this.totalpercentavril) + Number(this.chargecomplets[this.index5].avril_charge);
          this.totalpercentmai = Number(this.totalpercentmai) + Number(this.chargecomplets[this.index5].mai_charge);
          this.totalpercentjuin = Number(this.totalpercentjuin) + Number(this.chargecomplets[this.index5].juin_charge);
          this.totalpercentjuillet = Number(this.totalpercentjuillet) + Number(this.chargecomplets[this.index5].juillet_charge);
          this.totalpercentaout = Number(this.totalpercentaout) + Number(this.chargecomplets[this.index5].aout_charge);
          this.totalpercentseptembre = Number(this.totalpercentseptembre) + Number(this.chargecomplets[this.index5].septembre_charge);
          this.totalpercentoctobre = Number(this.totalpercentoctobre) + Number(this.chargecomplets[this.index5].octobre_charge);
          this.totalpercentnovembre = Number(this.totalpercentnovembre) + Number(this.chargecomplets[this.index5].novembre_charge);
          this.totalpercentdecembre = Number(this.totalpercentdecembre) + Number(this.chargecomplets[this.index5].decembre_charge);
        }
        console.log("Voici l'index 5.2", this.index5);
        this.totalpercentjanvier = (this.totalpercentjanvier/this.index5).toFixed(0);
        this.totalpercentfevrier = (this.totalpercentfevrier/this.index5).toFixed(0);
        this.totalpercentmars = (this.totalpercentmars/this.index5).toFixed(0);
        this.totalpercentavril = (this.totalpercentavril/this.index5).toFixed(0);
        this.totalpercentmai = (this.totalpercentmai/this.index5).toFixed(0);
        this.totalpercentjuin = (this.totalpercentjuin/this.index5).toFixed(0);
        this.totalpercentjuillet = (this.totalpercentjuillet/this.index5).toFixed(0);
        this.totalpercentaout = (this.totalpercentaout/this.index5).toFixed(0);
        this.totalpercentseptembre = (this.totalpercentseptembre/this.index5).toFixed(0);
        this.totalpercentoctobre = (this.totalpercentoctobre/this.index5).toFixed(0);
        this.totalpercentnovembre = (this.totalpercentnovembre/this.index5).toFixed(0);
        this.totalpercentdecembre = (this.totalpercentdecembre/this.index5).toFixed(0);
        this.displaypercent = true;
        this.display = false;
        this.AffichageUsers();
        });
    }

  }

  AffichageUsers(){
    //Affichage des logins utilisateurs
    for (this.index4 = 0; this.index4 < this.chargecomplets.length; this.index4++) {
      for (this.index10 = 0; this.index10 < this.utilisateurs.length; this.index10++) {
        if (this.chargecomplets[this.index4].fk_utilisateur_id == this.utilisateurs[this.index10].id_utilisateur) {
          //this.arrayusers.push(this.utilisateurs[this.index10].nom_utilisateur);
          this.chargecomplets[this.index4].fk_utilisateur_id = this.utilisateurs[this.index10].nom_utilisateur;
          console.log("VOICI L'ID EN NOM", this.chargecomplets[this.index4]);
          //console.log("Voici l'array utilisateurs", this.arrayusers);


        }

      }

    }
  }

  downloadCSV(csv, filename) {
    this.csvFile;
    this.downloadLink;

    // CSV file
    this.csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    this.downloadLink = document.createElement("a");

    // File name
    this.downloadLink.download = filename;

    // Create a link to the file
    this.downloadLink.href = window.URL.createObjectURL(this.csvFile);

    // Hide download link
    this.downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(this.downloadLink);

    // Click download link
    this.downloadLink.click();
  }

  exportTableToCSV(filename) {
    this.csv = [];
    this.rows = document.querySelectorAll("table tr");

    for (var i = 0; i < this.rows.length; i++) {
        var row = [], cols = this.rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        this.csv.push(row.join(","));
    }

    // Download CSV file
    this.downloadCSV(this.csv.join("\n"), filename);
}

exportexcel(): void
    {
      if (this.display == true) {

       /* table id is passed over here */
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
     }
     else {
       /* table id is passed over here */
       let element = document.getElementById('excel-table2');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
     }

    }












}
