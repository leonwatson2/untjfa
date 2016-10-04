import {Component, trigger, state, animate, transition, style} from '@angular/core';
import {SearchPipe} from '../pipes/search.pipe';
import {UsersService} from '../services/'
import {DisplayNumbersComponent} from '../misc/jfa.displayNumbers.component';
import {OrderByPipe} from '../pipes/orderby.pipe';
import {signupListHtml} from '../partials/signup-list.html';


class Flower{
 constructor(
  public name:string,
  public email:string,
  public birthday:string,
  public interests:Interest[]
  ){}
}

class Interest{
  public id:number;
  public name:string;
}


@Component({
	selector: 'jfa-signup-list',
	template: signupListHtml,
  directives: [DisplayNumbersComponent],
  pipes:[OrderByPipe, SearchPipe],
  styleUrls:['style/css/signup-list.css', 'style/css/signup.css'],
  animations:[
    trigger('loading',[
      state('in', 
        style({
          transform:'translateX(0)',
          opacity:'1'
        })
      ),
      transition('in <=> *', animate('2s '))

    ]), 
    trigger('delete',[
      state('deleting', 
        style({
           transform:"translateY(0)"
        })
      ), 
      state('searching',
        style({
           transform:"translateY(100%)"
        })
      ),
        transition('deleting <=> searching', animate('400ms ease-in'))
    ])

  ]
    
})

export class SignUpListComponent {
  public flower:Flower;
  public numberOfSignups:number;
  public users;
  public curUser;
  public numberOfUsers;
  public interests: Interest[];
  public clicking:boolean;
  public master:boolean;
  public ani;
  constructor(private usersService:UsersService){
    this.master = false;
    this.ani = {state:"searching"};
    this.curUser = {name:"", id:""}
    // setInterval(()=>this.getUsers(), 2000);
  };

  ngOnInit(){
    this.clicking = false;
    this.getUsers();
    this.getInterests();

  }
  updateInterests(e, interest, form){
   
  }
   
  checkPass(e){
    if(e.target.value == "moi"){
      this.master = true;
    }
  } 
  getUsers(){

    this.usersService.getSignups().subscribe((users) => {
      this.users = users; 
      this.numberOfUsers = users.length;

    });
    
  }
  getInterests(){
    this.usersService.getInterests().subscribe((interests) => {
      this.interests = interests;
    });
  }
  getPass(){
    return "moi";
  }
  
  toggleClicking(state){
    console.log(state);
    this.clicking = state;
  }
  openConfirm(user){
    this.ani.state = "deleting";
    this.curUser = user;
  }
  closeConfirm(){
    this.ani.state = "searching";
  }
  deleteUser(){
    this.usersService.userDelete(this.curUser).subscribe((res)=>{
      this.ani.state = "searching";
      this.getUsers();
    });
  }
}


