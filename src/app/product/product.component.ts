import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApihandlerService } from 'src/app/shared/apihandler.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() id: number | undefined ;
  displayedColumns = ['id', 'product_name', 'seller', 'description', 'price', 'action'];
  dataSource = new MatTableDataSource();
  datalist = [];
  value = '';
  recordFound: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor( private router: Router, private route: ActivatedRoute, private apiService: ApihandlerService) { }

  ngOnInit(): void {
    this.getProduct(); 
  }

 
  onMatSortChange(){
    console.log("onSort");
    this.dataSource.sort = this.sort;
  }

  
  editproduct(id: number, product_name:any, seller: any, description: any, price: any){
    console.log(id);
    this.router.navigate(['./editproduct'], {relativeTo: this.route, queryParams: {id: id}});

  }

  deleteproduct(id: number){
    console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleterequest('product/', id).subscribe(response => {
          console.log(response);
          this.getProduct()
          
          Swal.fire(
            'Deleted!',
            'Record has been deleted',
            'success'
          )
        
        })
      }
    })
  }

  onSearchKeyUp(search: { value: any; }){
    console.log(search.value);
    var currentFilter = search.value;
    this.dataSource.filter = currentFilter;

  }

  getProduct(){
    let url = 'product';
    this.apiService.getrequest(url).subscribe(response => {
      console.log(response);
      this.datalist = response;
      this.dataSource = new MatTableDataSource(response);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
