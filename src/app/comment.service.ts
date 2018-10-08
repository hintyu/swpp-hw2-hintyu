import { Injectable } from '@angular/core';

import { Comment } from './comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// httpHeaders란 무엇인가??
const httpOptions = {
  headers: new HttpHeaders( { 'Content-Type': 'application/json'} )
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = '/api/comments'

  constructor(
    private http: HttpClient
  ) { }

  /** GET functions **/
  getCommenteList(): Promise<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl)
      .toPromise()
      .catch(this.handleError('getCommentList', []))
  }

  getComment(id: number): Promise<Comment> {
    const url = `${this.commentUrl}/${id}`
    return this.http.get<Comment>(url)
      .toPromise()
      .catch(this.handleError('getComment id=${id}'))
  }

  /** PUT functions **/
  updateComment(comment: Comment): Promise<Comment> {
    const url = `${this.commentUrl}/${comment.id}`
    return this.http.put(url, comment, httpOptions)
      .toPromise()
      .then(() => comment)
      .catch(this.handleError<Comment>('updateComment'))
  }

  /** POST functions **/
  addComment(comment: Partial<Comment>): Promise<Comment> {
    return this.http.post<Comment>(this.commentUrl, comment, httpOptions)
      .toPromise()
      .catch(this.handleError<Comment>('addComent'))
  }

  /** DELETE functions **/
  deleteComment(comment: Comment | number): Promise<Comment> {
    const id = (typeof comment === 'number') ? comment : comment.id
    const url = '${this.commentUrl}/${id}'
    return this.http.delete<Comment>(url, httpOptions)
      .toPromise()
      .catch(this.handleError<Comment>('deleteComment)'))
  }

  /** Handle Http operation that failed **/
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      console.error(error);
      return Promise.resolve(result as T);
    };
  }

}
