import {Component, OnInit} from '@angular/core';
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {map, Observable} from "rxjs";
import {selectRolId} from "../../../store/auth/auth.selectors";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../store/auth/auth.state";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatAnchor,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatToolbar,
    RouterLink,
    MatMenuTrigger,
    NgForOf
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit{
  rolid$!: Observable<string | null>
  options: Array<{ path: string, title: string }> = [];

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.rolid$ = this.store.select(selectRolId);
    this.rolid$.pipe(
      map((rolid) => {
        console.log('EL rol,', rolid)
        if(rolid === '1') {
          this.options = [
            { path: '/home',                title: 'Home' },
            { path: '/dashboard-analytics', title: 'Dashboard' },
            { path: '/patient-management',  title: 'Patient Management' }
          ]
        }
        else if (rolid === '2') {
          this.options = [
            { path: '/home', title: 'Home' },
          ]
        }
        else {
          this.options = [
            { path: '/home', title: 'Home' },
            { path: '/login', title: 'Login' }
          ]
        }
      })
    ).subscribe({
      next: () => console.log('Options set based on role ID'),
      error: (err) => console.error('Error in role selection:', err),
      complete: () => console.log('Role selection observable completed')
    });
}




}
