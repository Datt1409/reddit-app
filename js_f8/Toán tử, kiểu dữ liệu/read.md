# Giới thiệu về toàn tử trong Javascript

## Toán tử số học - Arithmetic

1. - -> Cộng
2. - -> Trừ
3. - -> Nhân
4. / -> Chia
5. % -> Chia lấy số dư
6. ++ -> Tăng 1 giá trị
7. -- -> Giảm 1 giá trị
8. \*\* -> Luỹ thừa

## Toán tử gán - Assignment

- Toán tử Ví dụ Tương đương

= x = y x = y
+= x += y x = x + y  
-= x -= y x = x - y
_= x _= y x = x \* y
/= x /= y x = x / y
**= x **= y x = x \*\* y

- Nguyên lý hoạt động của toán từ ++ và --

* Prefix

`let a = 6`

`console.log(++a)` // 7

- Việc 1: +1 cho a -> a += 1 -> a = 7
- Việc 2: Trả về a sau khi được +1

* Postfix

`let a = 6`
`console.log(a++)` // 6
`console.log(a)` //7

- Việc 1: Tạo a copy, a copy = 6
- Việc 2: +1 cho a -> a += 1 -> a = 7
- Việc 3: Trả về a copy

## Toán tử so sánh - Comparison

## Toán tử logic - Logical

Các giá trị falsy: `0, undefined, NaN, null, "", false`

1. && - And

- Toán tử AND trả về giá trị true nếu cả hai toán hạng là true, ngược lại sẽ trả về false.

- Toán tử && sẽ tìm và trả về giá trị falsy đầu tiên. Nếu không có giá trị falsy nào thì kết quả sẽ là giá trị của toán hạng cuối cùng.

- Quá trình xử lý như sau:

* Thứ tự thực hiện từ trái qua phải

* Lần lượt chuyển mỗi toán hạng về kiểu boolean
  ** Nếu kết quả là false thì trà về giá trị gốc của toán hạng đó và dừng lại
  ** Nếu kết quả là true thì tiếp tục với toán hạng tiếp theo

* Nếu không có giá trị falsy nào thì kết quả trả về là giá trị của toán hạng cuối cùng

`console.log(1 && 0);` // 0 (giá trị falsy đầu tiên là 0)
`console.log(null && 2);` // null (giá trị falsy đầu tiên là null)
`console.log(10 && "" && undefined && 0);` // "" (giá trị falsy đầu tiên là "")
`console.log("n" && undefined && 10); `// undefined (giá trị falsy đầu tiên là undefined)
`console.log(10 && "a");` // "a" (không có giá trị falsy, trả về giá trị cuối cùng)

2. || - OR

- Toán tử OR trả về giá trị true nếu có ít nhất một toán hạng là true, ngược lại sẽ trả về false.

- Toán tử OR sẽ tìm và trả về giá trị truthy đầu tiên. Nếu không có giá trị truthy nào thì kết quả sẽ là giá trị của toán hạng cuối cùng.

- Quá trình xử lý như sau:

* Thứ tự thực hiện từ trái qua phải

* Lần lượt chuyển mỗi toán hạng về kiểu boolean
  ** Nếu kết quả là true thì trả về giá trị gốc của toán hạng đó và dừng lại
  ** Nếu kết quả là false thì tiếp tục thực hiện toán hạng tiếp theo

* Nếu không có giá trị truthy nào thì sẽ trả về giá trị của toán hạng cuối cùng

`console.log(1 || 0);` // 1 (giá trị truthy đầu tiên là 1)
`console.log(null || 2);` // 2 (giá trị truthy đầu tiên là 2)
`console.log("" || undefined || 0 || 10);` // 10 (giá trị truthy đầu tiên là 10)
`console.log(null || 100 || 5 || undefined);` // 100 (giá trị truthy đầu tiên là 100)
`console.log("" || 0 || null);` // null (không có giá trị truthy, trả về giá trị cuối cùng)

3. ! - Not

- Toán tử NOT trả về giá trị true nếu toán hạng là false và trả về false nếu toán hạng là true.

- Vì toán tử một ngôi, nên toán tử Not chỉ chứa 1 toán hạng

- Quá trình xử lý như sau:

* Chuyển giá trị của toán hạng về dạng boolean: true hoặc false
* Trả vê giá trị ngược lại

`console.log(!"hello");` // false ("hello" là truthy)
`console.log(!100);` // false (100 là truthy)
`console.log(!"");` // true ("" là falsy)
`console.log(!0);` // true (0 là falsy)
`console.log(!null);` // true (null là falsy)
`console.log(!undefined);` // true (undefined là falsy)

- Nếu sử dụng hai toán tử NOT !! thì nó sẽ có tác dụng chuyển đổi kiểu dữ liệu về giá trị boolean

`console.log(!!"hello");` // true
`console.log(!!null);` // false

# Kiểu dữ liệu trong Javascript

## Dữ liệu nguyên thuỷ - Primitive Data

1. Number
2. String
3. Boolean
4. Undefined
5. Null
6. Symbol

## Dữ liệu phức tạp - Complex Data

1. Object
2. Function
