import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) { }
  getNotices() {
    return this.http.get(environment.apiUrl + "/notice")
  }

  updateNotice(id: string, formData: any) {
    return this.http.put(environment.apiUrl + "/notice/" + id, formData)
  }

  deleteNotice(id: string) {
    return this.http.delete(environment.apiUrl + "/notice/" + id)
  }

  addNotice(formData: any) {
    return this.http.post(environment.apiUrl + "/notice", formData)
  }

  getEvents() {
    return this.http.get(environment.apiUrl + "/event")
  }

  addEvent(formData: any) {
    return this.http.post(environment.apiUrl + "/event", formData)
  }

  updateEvent(id: string, formData: any) {
    return this.http.put(environment.apiUrl + "/event/" + id, formData)
  }

  deleteEvent(id: string) {
    return this.http.delete(environment.apiUrl + "/event/" + id)
  }

  getGallery() {
    return this.http.get(environment.apiUrl + "/gallery")
  }

  addGallery(formData: any) {
    return this.http.post(environment.apiUrl + "/gallery", formData)
  }

  updateGallery(id: string, formData: any) {
    return this.http.put(environment.apiUrl + "/gallery/" + id, formData)
  }

  deleteGallery(id: string) {
    return this.http.delete(environment.apiUrl + "/gallery/" + id)
  }

  getTeacher() {
    return this.http.get(environment.apiUrl + "/teacher")
  }

  addTeacher(formData: any) {
    return this.http.post(environment.apiUrl + "/teacher", formData)
  }

  updateTeacher(id: string, formData: any) {
    return this.http.put(environment.apiUrl + "/teacher/" + id, formData)
  }

  deleteTeacher(id: string) {
    return this.http.delete(environment.apiUrl + "/teacher/" + id)
  }

  postContact(formData: any) {
    return this.http.post(environment.apiUrl + "/contact", formData)
  }

  getContacts() {
    return this.http.get(environment.apiUrl + "/contact")
  }

  deleteContact(id: string) {
    return this.http.delete(environment.apiUrl + "/contact/" + id)
  }
}
