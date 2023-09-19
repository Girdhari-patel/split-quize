import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { Student } from 'src/Student.model';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private firestore: Firestore) {}

  getData() {
    return getDoc(doc(this.firestore, 'Stddatabase'));
  }

  getStudentList() {
    let arry: any = [];
    return new Promise(async (resolve, reject) => {
      const querySnapshot = await getDocs(
        collection(this.firestore, 'Stddatabase')
      );
      querySnapshot.forEach((doc) => {
        let student: any = doc.data();
        student.id = doc.id;
        arry.push(student);
        console.log(doc.id, ' => ', doc.data());
      }, resolve(arry));
    });
  }

  createStudent(student: Student) {
    return new Promise<any>((resolve, reject) => {
      const docRef = addDoc(collection(this.firestore, 'Stddatabase'), student).then((res) => {
        resolve(res);
      })
    });
  }

  deletStudent(student: any) {
    deleteDoc(doc(this.firestore, 'Stddatabase', student.id))
  }


  updatStudent(student: Student, id: any) {
    var update = doc(this.firestore, 'Stddatabase', id);
    updateDoc(update, {
      Name: student.Name,
      dob: student.dob,
      Email: student.Email,
      mobile: student.mobile,
    });
  }
}


 