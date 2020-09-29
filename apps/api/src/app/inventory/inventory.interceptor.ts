// export interface Response<T> {
//   data: T;
// }

// @Injectable()
// export class InventoryInterceptor<ArticleSchema> implements NestInterceptor<ArticleSchema, ArticleDto[]> {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<ArticleDto[]> {
//     return next.handle().pipe(map(data => ({ data: 'pook' })));
//   }
// }
