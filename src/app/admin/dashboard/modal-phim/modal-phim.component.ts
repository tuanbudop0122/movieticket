import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MovieService } from 'src/app/core/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-phim',
  templateUrl: './modal-phim.component.html',
  styleUrls: ['./modal-phim.component.scss'],
})
export class ModalPhimComponent implements OnInit {
  form: FormGroup;
  imgPreview: string | ArrayBuffer = '';
  @Input() flagModal;
  @Input() itemSuaPhim;
  // @ViewChild('form', { static: false }) form: FormGroup;
  name: string;

  constructor(private movieService: MovieService) {
    this.form = new FormGroup({
      maPhim: new FormControl(''),
      tenPhim: new FormControl(''),
      biDanh: new FormControl(''),
      trailer: new FormControl(''),
      hinhAnh: new FormControl(''),
      moTa: new FormControl(''),
      maNhom: new FormControl('GP10'),
      ngayKhoiChieu: new FormControl(''),
      danhGia: new FormControl(''),
    });
  }

  handleChangeFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    this.form.patchValue({ hinhAnh: file });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e) => {
      this.imgPreview = e.target.result;
    };
  }
  ngOnChanges() {
    this.CheckModal();
    if (this.flagModal === false) {
      this.form.setValue({ ...this.itemSuaPhim });
    } else {
      this.form.setValue({
        maPhim: '',
        tenPhim: '',
        biDanh: '',
        trailer: '',
        hinhAnh: '',
        moTa: '',
        maNhom: 'GP10',
        ngayKhoiChieu: '',
        danhGia: '',
      });
    }
  }
  ngOnInit() {}
  handleAddMovie() {
    if (this.flagModal === false) {
      this.movieService.capNhatPhim(this.form.value).subscribe(
        (data: any) => {
          Swal.fire({
            text: 'Thành công!',
            icon: 'success',
            confirmButtonColor: '#a5dc86',
            confirmButtonText: 'OK',
          }).then(() => {
            location.reload();
          });
        },
        (err) => {
          Swal.fire({
            text: err.error,
            icon: 'warning',
            confirmButtonColor: '#facea8',
            confirmButtonText: 'OK',
          }).then(() => {});
        }
      );
    } else {
      this.movieService.addMovie(this.form.value).subscribe(
        (data: any) => {
          Swal.fire({
            text: 'Thành công!',
            icon: 'success',
            confirmButtonColor: '#a5dc86',
            confirmButtonText: 'OK',
          }).then(() => {
            location.reload();
          });
        },
        (err) => {
          Swal.fire({
            text: err.error,
            icon: 'warning',
            confirmButtonColor: '#facea8',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }

  CheckModal() {
    if (this.flagModal === true) {
      this.name = 'Thêm Phim';
    } else {
      this.name = 'Sửa Phim';
    }
  }
}
