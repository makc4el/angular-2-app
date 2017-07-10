import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public json__view;
  public clean__grid = [{}];
  public grid__arr = [{}];
  public pick__color__var = '';
  public edit__arr = [
  	{
  		'index':'0',
  		'color__name':'Red',
  		'color__rgb':'255,0,0',
  	},
  	{
  		'index':'1',
  		'color__name':'Green',
  		'color__rgb':'0,255,0',
  	},
  	{
  		'index':'2',
  		'color__name':'Blue',
  		'color__rgb':'0,0,255',
  	},
  	{
  		'index':'3',
  		'color__name':'Black',
  		'color__rgb':'0,0,0',
  	},
  ]

  ngOnInit(){
  	var self = this;
  	self.create__def__grid();
  }

  pick__color(arg){
  	var self = this;
  	for(let item in self.edit__arr){
  		if(self.edit__arr[item].index == arg){
  			self.pick__color__var = self.edit__arr[item].index;
  			return 0;
  		}
  	}
  }

  reset__grid(){
  	var self = this;
  	self.create__def__grid();
  }

  open__grid(){
  	var self = this;
    var load__json = JSON.parse(localStorage.getItem('color__game__save'));
    self.grid__arr = load__json;
  }

   save__grid(){
  	var self = this;
  	var my__json = JSON.stringify(self.grid__arr); 
    localStorage.setItem('color__game__save', my__json);
  }

  save__json(text, filename){
	  var a = document.createElement('a');
	  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
	  a.setAttribute('download', filename);
	  a.click();
	}

   create__def__grid(){
    var self = this;
    for (let i = 0; i < 100;i++){
      self.clean__grid[i] = {'index':i,'color__rgb':false} 
    }
    self.grid__arr = self.clean__grid;
  }


  set__color(arg){
  	var self = this;
  	if(self.pick__color__var == ''){
  		return 0;
  	}
  	else if(self.grid__arr[arg]['color__rgb'] == self.edit__arr[self.pick__color__var].color__rgb){
  		self.pick__color__var = '';
  		return 0;
  	}
  	else if(self.grid__arr[arg]['color__rgb'] == false){
  		self.grid__arr[arg]['color__rgb'] = self.edit__arr[self.pick__color__var].color__rgb;
  		self.pick__color__var = '';
  	}
  	else{
  		var my__current__color = self.grid__arr[arg]['color__rgb'].split(',');
  		var my__new__color = self.edit__arr[self.pick__color__var].color__rgb.split(',');
  		var my__color = '';

  		for(var i = 0; i < my__current__color.length; i++){
  			var summ = parseInt(my__current__color[i]) + parseInt(my__new__color[i]);
  			var my__val = summ;
  			if(summ != 0){
  				my__val = summ / 2 ;
  			}
  			var symbol = '';
  			if(i <my__current__color.length-1){
  				symbol = ',';
  			}

  			my__color = my__color + my__val.toString().split('.')[0] + symbol;
  		}
  		self.grid__arr[arg]['color__rgb'] = my__color;
  		self.pick__color__var = '';
  	}
  }





  show__save(){
    var self = this;
    var save__grid = localStorage.getItem('color__game__save');
    if(save__grid == ''){
      save__grid = 'sorry no saved game...';
    }
    self.json__view = save__grid;
    document.getElementById('json__view').style.display = 'block';
  }

  show__current(){
    var self = this;
    self.json__view = JSON.stringify(self.grid__arr);
    document.getElementById('json__view').style.display = 'block';
  }

  close__json__view(){
    var self = this;
    document.getElementById('json__view').style.display = 'none';
  }
}
