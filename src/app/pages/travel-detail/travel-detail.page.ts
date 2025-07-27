import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController, IonicModule, Platform, ModalController } from '@ionic/angular'; // adicione ModalController aqui
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LocationService, Location } from '../../services/location.service';
import { LocationCommentModalComponent } from '../../location.comment.modal.component'; 

@Component({
  selector: 'app-travel-detail',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './travel-detail.page.html',
  styleUrls: ['./travel-detail.page.scss']
})
export class TravelDetailPage implements OnInit {
  travelId!: string;
  locations: Location[] = [];
  newLocation: Location = {
    travelId: '',
    description: '',
    type: '',
    state: '',
    map: '',
    startAt: null,
    endAt: null,
    createdBy: '',  
    prop1: '',
    prop2: '',
    prop3: '',
  };

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router,
    private platform: Platform,
    private modalCtrl: ModalController 
  ) {}

  ngOnInit() {
    this.travelId = this.route.snapshot.paramMap.get('id')!;
    this.newLocation.travelId = this.travelId;
    this.loadLocations();
  }

  async loadLocations() {
    const loading = await this.loadingCtrl.create({ message: 'A carregar locais...' });
    await loading.present();

    this.locationService.getLocationsByTravelId(this.travelId).subscribe({
      next: async (data: Location[]) => {
        this.locations = data;
        await loading.dismiss();
      },
      error: async () => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Erro ao carregar locais',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  async addLocation() {
    if (!this.newLocation.description) {
      const toast = await this.toastCtrl.create({
        message: 'Descrição é obrigatória',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'A adicionar local...' });
    await loading.present();

    this.locationService.createLocation(this.newLocation).subscribe({
      next: async (location: Location) => {
        this.locations.push(location);
        this.newLocation.description = '';
        this.newLocation.type = '';
        this.newLocation.state = '';
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Local adicionado com sucesso',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      },
      error: async () => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Erro ao adicionar local',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  openMap() {
    if (!this.newLocation.map) {
      return;
    }

    const url = this.newLocation.map;

    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      window.open(url, '_system');
    } else {
      window.open(url, '_blank');
    }
  }

  async openAddLocationComment(locationId: string) {
    const modal = await this.modalCtrl.create({
      component: LocationCommentModalComponent,
      componentProps: { locationId }  
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
      }
    });

    return await modal.present();
  }
}
