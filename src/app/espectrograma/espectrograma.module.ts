
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspectrogramaRoutingModule } from './espectrograma-routing.module';
import { EspectrogramaComponent } from './espectrograma.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { createButtonConfig, ImageViewerConfig, ImageViewerModule, IMAGEVIEWER_CONFIG } from '@emazv72/ngx-imageviewer';

const IMAGEVIEWER_CONFIG_CUSTOMIZE: ImageViewerConfig = {
  width: 800, // component default width
  height: 600, // component default height
  bgStyle: '#ECEFF1', // component background style
  scaleStep: 0.1, // zoom scale step (using the zoom in/out buttons)
  rotateStepper: false, // touch rotate should rotate only 90 to 90 degrees
  loadingMessage: 'Loading...',
  buttonStyle: {
    iconFontFamily: 'Material Icons', // font used to render the button icons
    alpha: 0.5, // buttons' transparence value
    hoverAlpha: 0.7, // buttons' transparence value when mouse is over
    bgStyle: '#000000', //  buttons' background style
    iconStyle: '#ffffff', // buttons' icon colors
    borderStyle: '#000000', // buttons' border style
    borderWidth: 0, // buttons' border width (0 == disabled)
  },
  tooltips: {
    enabled: true, // enable or disable tooltips for buttons
    bgStyle: '#000000', // tooltip background style
    bgAlpha: 0.5, // tooltip background transparence
    textStyle: '#ffffff', // tooltip's text style
    textAlpha: 0.9, // tooltip's text transparence
    padding: 15, // tooltip padding
    radius: 20, // tooltip border radius
  },
  zoomOutButton: {
    // zoomOut button config
    icon: 'zoom_out', // icon text
    tooltip: 'Zoom out', // button tooltip
    sortId: 0, // number used to determine the order of the buttons
    show: true, // used to show/hide the button
  },

  // shorter button configuration style
  nextPageButton: createButtonConfig('navigate_next', 'Next page', 0),
  beforePageButton: createButtonConfig('navigate_before', 'Previous page', 1),
  zoomInButton: createButtonConfig('zoom_in', 'Zoom in', 1),
  rotateLeftButton: createButtonConfig('rotate_left', 'Rotate left', 2),
  rotateRightButton: createButtonConfig('rotate_right', 'Rotate right', 3),
  resetButton: createButtonConfig('autorenew', 'Reset', 4),
};


@NgModule({
  declarations: [
    EspectrogramaComponent
  ],
  imports: [
    CommonModule,
    EspectrogramaRoutingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageViewerModule
  ],
  providers: [
    {
      provide: IMAGEVIEWER_CONFIG,
      useValue: IMAGEVIEWER_CONFIG_CUSTOMIZE
    }

  ]
})
export class EspectrogramaModule { }
