import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() id: number | undefined ;
  displayedColumns = ['id', 'product_name', 'seller', 'description', 'price', 'action'];
  dataSource = new MatTableDataSource();
  datalist = [ {'id':1, 'product_name': 'dresses', 'seller': 'Myntra', 'description': 'white dress','price': 100.00},
  {'id':2, 'product_name': 'shoes', 'seller': 'Flipkart', 'description': 'white shoe','price': 200.00},
  {'id':3, 'product_name': 'Chocolate', 'seller': 'Amazon', 'description': 'chocolate','price': 300.00}];
  value = '';
  recordFound: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSource.data = this.datalist; 
  }

 
  onMatSortChange(){
    console.log("onSort");
    this.dataSource.sort = this.sort;
  }

  
  editproduct(id: number){
    console.log(id);
    this.router.navigate(['./editproduct'], {relativeTo: this.route, queryParams: {id: id}});

  }

  deleteproduct(id: number){

  }

  onSearchKeyUp(search: { value: any; }){
    console.log(search.value);
    var currentFilter = search.value;
    this.dataSource.filter = currentFilter;

  }

}
