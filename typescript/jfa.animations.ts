import {Component, trigger, state, style, transition, animate, keyframes} from '@angular/core';


export const flyFromLeft = trigger('flyFromLeft', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate('350ms ease-out')
    ]),
    transition('* => void', [
      animate('350ms ease-in' , style({transform: 'translateX(-100%)'}))
    ])
  ]);
export const flyInOut = trigger('flyInOut', [
    state('in', style({transform: 'translateX(0) scale(1)'})),
    transition('void => *', [
      animate('1.5s', 
        keyframes([ 
          style({
            transform: 'translateX(-100%) scale(.5)',
            'z-index':'-1',
            'transform-origin':'top', 
            offset:0
          }),
          style({
            transform: 'translateX(15%) scale(.5)',
            'z-index':'-1',
            'transform-origin':'top', 
            offset:.2
          }),
          style({
            transform: 'translateX(0%) scale(1.1)',
            'z-index':'-1',
            'transform-origin':'top', 
            offset:.7
          })
        ])
      )
    ]),
    transition('* => void', [
    	animate('750ms ease-in', style({
    		transform: 'scale(0) translateX(200%)',
    		'transform-origin':'top'
    	}))
    ])
  ]);
