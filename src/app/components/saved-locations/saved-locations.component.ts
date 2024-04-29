import { Component, OnInit } from '@angular/core';
import { LabelCardComponent } from '../label-card/label-card.component';
import { CommonModule } from '@angular/common';
import { SavedLocationsService } from '../../services/saved-locations.service';

@Component({
  selector: 'app-saved-locations',
  standalone: true,
  imports: [LabelCardComponent, CommonModule],
  providers: [],
  templateUrl: './saved-locations.component.html',
  styleUrl: './saved-locations.component.css',
})
export class SavedLocationsComponent implements OnInit {
  constructor(private SavedLocationsService: SavedLocationsService) {}
  locationData: any;
  ngOnInit() {
    this.SavedLocationsService.getsavedLocations().subscribe((data) => {
      if (data.status) {
        this.locationData = data.data;
        console.log(' subscribed data', this.locationData);
      }
    });
  }
}
