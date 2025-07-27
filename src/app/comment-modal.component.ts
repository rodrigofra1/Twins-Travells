import { Component, Input } from '@angular/core';
import { ModalController, IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentService, Comment } from './services/comment.service';

@Component({
  selector: 'app-comment-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Adicionar Comentário</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cancelar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-textarea rows="6" [(ngModel)]="commentText" placeholder="Escreve aqui o comentário..."></ion-textarea>
      <ion-button expand="block" (click)="submit()">Enviar</ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CommentModalComponent {
  @Input() travelId!: string;
  commentText = '';

  constructor(
    private modalCtrl: ModalController,
    private commentService: CommentService,
    private toastCtrl: ToastController
  ) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  submit() {
    if (!this.commentText.trim()) {
      this.toastCtrl.create({
        message: 'Comentário não pode estar vazio',
        duration: 2000,
        color: 'warning'
      }).then(toast => toast.present());
      return;
    }

    const comment: Comment = {
      travelId: this.travelId,
      comment: this.commentText.trim()
    };

    this.commentService.addComment(comment).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Comentário adicionado com sucesso',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.modalCtrl.dismiss(true);  
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Erro ao adicionar comentário',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
