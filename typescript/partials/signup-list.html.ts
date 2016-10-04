export const signupListHtml = `<div  class="main">
		<div *ngIf="master" class="card signup">
			<h1>JFA Sign Up <span>{{numberOfUsers}}</span></h1>
			<input type="text" [value]="Mike" placeholder="Search Me" [(ngModel)]="searchName" (click)="closeConfirm()">
		<ul @loading="ani.state" *ngIf="users">
			<li *ngFor="let user of users">
				<div class="user">
					<div>{{user.name}}</div>
					<span (click)="openConfirm(user)" class="remove">x</span>
				</div>
			</li>
		</ul>
		<div *ngIf="!users" class="loading">
			<img src="../images/juggling.gif" alt="Juggling Gif">
		</div>
			
		</div>
		<div *ngIf="!master" class="card signup">
			<h2>Qui est vous?</h2>
			<input type="password" (keyup)="checkPass($event)">			
		</div>
		<div @delete="ani.state" class="confirm">
			<h2>Delete</h2>
			<h3>{{curUser.name}}</h3>
			<button (click)="deleteUser()">Yes</button>
			<button (click)="closeConfirm()">No</button>
			<span class="close" (click)="closeConfirm()">x</span>
		</div>
		<display-numbers title="Number of Signups" numberOfUsers="{{numberOfUsers}}"></display-numbers>
</div>
`;