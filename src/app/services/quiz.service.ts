import { Injectable } from '@angular/core';
import { collection, doc, Firestore, query, writeBatch } from '@angular/fire/firestore';
import { getDocs } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private firbase:Firestore) { }

  getquize(){ 
    let arry:any=[];
    return new Promise (async (resolve, reject) =>{
      const querySnapshot = await getDocs(collection(this.firbase, 'contentAccountMapping/aOSN66Kte3O0JixJ0zqd/quiz/'));
      querySnapshot.forEach((doc) => {
        let student:any=doc.data()
        arry.push(student)
        // console.log(doc.id, " => ", doc.data());
      },
      resolve(arry));
      
          })
     }

  async getqueston(quizId:any){
    
    let  ques:any = [];
     const q = query(collection(this.firbase, "contentAccountMapping/aOSN66Kte3O0JixJ0zqd/quiz/"+quizId+"/question"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
         let question:any = doc.data();
        ques.push(question)
     console.log(doc.id, " => ", doc.data());
    
    });
    return ques
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /// add document to firebase/////
    async addDoc(quizes:any, quizz:any){
      let batch = writeBatch(this.firbase);
    
      for(let i=0;i<=quizes.length-1;i++){
        let quizId = this.uuidv4();
        // let  quiz = quizz[0].image;
         console.log(quizes[i]);
        if(quizes[i].length==0){
    
          continue;
        }
        const docref = doc(collection(this.firbase, 'contentAccountMapping/aOSN66Kte3O0JixJ0zqd/quiz'),quizId);

        batch.set(docref, {
          quizId:quizId,
          quizName:`${quizz[0].quizName} ${i+1}`,
          image:quizz[0].image,
          quizDescription:quizz[0].quizDescription
        });

        let question = quizes[i];
        for(let j=0;j<=question.length-1;j++){

          let questionId = this.uuidv4();
  
          console.log(question[j])
          const colref = doc(docref, 'question', questionId);
            
          batch.set(colref, question[j]);
        }
      
   }
   await batch.commit();
      }



    }



