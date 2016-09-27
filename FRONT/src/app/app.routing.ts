import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleMountainComponent }  from './components/singleMountain.component';
import { MountainsComponent }  from './components/mountains.component';
import { LanginPageComponent }  from './components/landingPage.component';



const appRoutes: Routes = [
  { path: '', component: LanginPageComponent  },
  { path: 'mountain/:id', component: SingleMountainComponent },
  { path: 'search/:phrase', component: MountainsComponent },

];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
