import type { PageParams } from "../types/paged-result";

export interface FileStoreDto{
  id: number;
  filePath?: string;
  description?: string;
  fileStoreCategory: FileStoreCategory;
  fileProvider?: FileProvider;
  isActive?: boolean;
 
}


// export type GetSelectListFileStoreResponse =
//   Omit<GetAllFileStoreResponse, "icon"|"urlName"|"image"|"parentId">;

export interface GetAllFileStoreResponse extends FileStoreDto {}

export interface GetByIdFileStoreResponse extends FileStoreDto {
      originalFileName?: string;
        storedFileName?: string;
        fileExtension?: string;
        contentType?: string;
}




export interface CreateFileStoreRequest{
        file: File | Blob,
          category: FileStoreCategory;

}
export interface CreateFileStoreResponse{
        id: number ,
          path:string ;

}

export interface UpdateFileStoreResponse extends CreateFileStoreResponse{
       
}

export interface UpdateFileStoreRequest extends CreateFileStoreRequest{
        id: number,
}

export type GetAllFileStoreRequest = PageParams & {
      [key: string]: string | number | boolean | undefined;

    Q?: string;
    FileStoreCategory: FileStoreCategory;
    FileProvider?: FileProvider;
 
};




export enum FileStoreCategory {
  Default = 0,
  Product = 1,
  ProductGallery = 2,
  Banner = 3,
  Category = 4,
    Blog = 5,
}

export enum FileProvider {
  Local = 1,
  Minio = 2,
  AzureBlob = 3,
  AwsS3 = 4,
}






