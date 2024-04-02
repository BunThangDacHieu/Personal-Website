import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
  }
  categories(){
    this.router.navigate(['categories'], {relativeTo:this.route});
  }
}
