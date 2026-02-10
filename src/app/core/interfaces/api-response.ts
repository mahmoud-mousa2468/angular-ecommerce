// 1. عرف شكل الـ Metadata لوحدها الأول
export interface IMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

// 2. ضيفها للـ Interface الأساسي
export interface IApiResponse<T> {
  message?: string;       // رسالة النجاح
  statusMsg?: string;     // حالة الطلب
  status?: string;      // ✅ ضيف السطر ده (عشان الـ Payment API بيرجع status)
  numOfCartItems?: number; // خاصة بالسلة
  count?: number;          // خاصة بالـ Wishlist
  // ✅ الإضافة الجديدة عشان الدفع
  session?: { url: string };
  // ✅ خاصة بالـ Pagination (المنتجات)
  results?: number;       
  metadata?: IMetadata;   
  // ✅ إضافات الـ Auth (بناءً على الـ JSON اللي بعته)
  token?: string; 
  user?: T;        // هنا الـ T هتكون IUser في حالة الـ Auth
  data: T;                // البيانات الأساسية
}


