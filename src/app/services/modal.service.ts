import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  #modals: IModal[] = []

  constructor() { }

  unregister(id: string) {
    this.#modals = this.#modals.filter(item => item.id === id)
  }

  isModalOpen(id: string): boolean {
    return !!this.#modals.find(element => element.id === id)?.visible
  }
  toggleModal(id: string) {

    const modal = this.#modals.find(item => item.id === id)
    if (modal) {
      modal.visible = !modal.visible
    }
  }
  register(id: string) {
    this.#modals.push({ id, visible: false })
  }
}
