import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import { MountainsComponent }  from './components/mountains.component';
import { NavigationComponent } from './components/nav.component';
import { MountainService }          from './services/mountain.service';
import { ForecastService }          from './services/forecast.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MdInputModule } from '@angular2-material/input';
import { RandomMountainsComponent } from './components/randomMountains.component';
import { SimpleForecastComponent } from './components/simpleForecast.component';
import { SingleMountainComponent } from './components/singleMountain.component';
import { LanginPageComponent } from './components/landingPage.component';
import { config } from './app.config';


import { routing,
  appRoutingProviders }  from './app.routing';

@NgModule({
  imports: [BrowserModule, Ng2BootstrapModule, HttpModule, MdInputModule.forRoot(), routing],
  declarations: [AppComponent, MountainsComponent, NavigationComponent, RandomMountainsComponent, SimpleForecastComponent, SingleMountainComponent, LanginPageComponent],
  bootstrap: [AppComponent],
  providers: [MountainService, ForecastService, appRoutingProviders, config]
})
export class AppModule {
}
