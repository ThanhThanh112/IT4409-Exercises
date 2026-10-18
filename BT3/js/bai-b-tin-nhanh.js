/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.

const danhSach = document.getElementById("list");
const oTimKiem = document.getElementById("o-tim-kiem");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");

function capNhatBoDem() {
	const cacTin = Array.from(danhSach.children);
	const soHien = cacTin.filter(tin => !tin.classList.contains("an")).length;
	boDem.textContent = `Đang hiển thị ${soHien}/${cacTin.length} tin`;
	return soHien;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.

function locTin() {
	const tuKhoa = oTimKiem.value;
	for (const tin of danhSach.children) {
		const vanBan = tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent;
		tin.classList.toggle("an", !vanBan.toLowerCase().includes(tuKhoa.toLowerCase()));
	}
	const soHien = capNhatBoDem();
	khongThay.classList.toggle("an", soHien > 0);
	khongThay.textContent = soHien === 0 ? `Không tìm thấy tin nào cho "${tuKhoa}"` : "";
}

oTimKiem.addEventListener("keyup", locTin);
locTin();

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.

danhSach.addEventListener("click", (e) => {
	const nut = e.target.closest("button.more");
	if (!nut || !danhSach.contains(nut)) return;
	const doan = nut.parentNode.querySelector("p");
	const dayDu = doan.classList.toggle("day-du");
	nut.textContent = dayDu ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.

const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const baoLoi = document.getElementById("bao-loi");

document.getElementById("nut-dang").addEventListener("click", () => {
	if (oTieuDe.value === "" || oNoiDung.value === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}
	const tin = document.createElement("li");
	const ngay = document.createElement("span");
	ngay.className = "time";
	ngay.textContent = homNay();
	const tieuDe = document.createElement("h3");
	tieuDe.textContent = oTieuDe.value;
	const noiDung = document.createElement("p");
	noiDung.textContent = oNoiDung.value;
	const nut = document.createElement("button");
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";
	tin.append(ngay, tieuDe, noiDung, nut);
	danhSach.prepend(tin);
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	locTin();
});
