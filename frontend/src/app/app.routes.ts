import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'tutorial', component: TutorialComponent },
    { path: 'step2', component: Step2Component },
    { path: 'step3', component: Step3Component }
];


export class AppRoutingModule { }