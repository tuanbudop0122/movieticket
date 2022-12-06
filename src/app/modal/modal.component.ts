import { Component, OnInit } from '@angular/core';
import { TrailerService } from 'src/app/core/services/trailer.service';
import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private trailer: TrailerService) {}

  ngOnInit(): void {
    this.trailer.SharingTrailer.subscribe((data: any) => {
      let TrailerChiTiet = ''
      if (Object.entries(data).length) {
        let kt = data.trailer.includes('youtu.be/')
        if (kt == true){
           TrailerChiTiet = data.trailer.replace('youtu.be/','www.youtube.com/embed/');
        }
        else {
          TrailerChiTiet = data.trailer.replace('watch?v=','embed/');
        }
        let contentBody = `<iframe width="100%" class="video" height="500px" src=${TrailerChiTiet}></iframe>`;
        let modalBody = <HTMLInputElement>document.getElementById('modal-body');
        modalBody.innerHTML = contentBody;
        $('.stop-iframe').click(function () {
          $('.video').each(function () {
            $(this).attr('src', $(this).attr('src'));
            return false;
          });
        });
      }
    });
  }
}
