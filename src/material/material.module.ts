import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDividerModule,
  MatGridListModule,
  MatSelectModule,
  MatListModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTableModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,  MatTabsModule,
  MatProgressBarModule
} from '@angular/material';


const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDividerModule,
  MatGridListModule,
  MatSelectModule,
  MatListModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTableModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatProgressBarModule,

]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ],
  declarations: []
})
export class MaterialModule { }
