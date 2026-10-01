let cartCount = 0;
let toastTimeout;
let isLoggedIn = false;
let isRegisterMode = false;//hiển thị form đăng nhập
let pendingProduct = null; //lưu sản phẩm khách định mua trước khi bị chặn bởi đăng nhập

const authModal = document.getElementById('auth-modal');
const modalTitle = document.getElementById('modal-title');
const emailGroup = document.getElementById('email-group');
const submitBtn = document.getElementById('submit-btn');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');

const authTrigger = document.getElementById('auth-trigger');
const userDisplay = document.getElementById('user-display');

function addToCart(productName) {
    if (!isLoggedIn) {
        //hàm này chỉ chưa đăng nhập nhưng lưu món ở giỏ hàng sẵn cho ng dùng
        pendingProduct = productName;
        openAuthModal();
        showToast("Vui lòng đăng nhập trước khi mua hàng!", "#f44336");//báo lỗi màu đỏ
    }
    else {
        //nếu đã đăng nhập chạy thẳng hàm thêm giỏ hàng
        executeAddToCart(productName);
    }
}
//hàm này để xử lý giỏ hàng thực sự
function executeAddToCart(productName) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    showToast('Đã thêm"' + productName + '"vào giỏ!', "#4CAF50");
}

//logic hộp thoại modal và form
function openAuthModal() {
    authModal.classList.add('show');
}
function closeAuthModal() {
    authModal.classList.remove('show');
    pendingProduct = null; //xóa món hàng đang chờ nếu họ đăng nhập
}
toggleLink.addEventListener('click', function (event) {
    event.preventDefault();//Ngăn chặn trình duyệt nhảy trang khi bấm thẻ<a>

    isRegisterMode = !isRegisterMode;

    if (isRegisterMode) {
        modalTitle.innerText = "Đăng ký";
        emailGroup.style.display = "block";
        emailInput.required = true;
        submitBtn.innerText = "Tạo tài khoản";
        toggleText.innerText = "Đã có tài khoản";
        toggleLink.innerText = "Đăng nhập";
    }
    else {
        modalTitle.innerText = "Đăng Nhập";
        emailGroup.style.display = "none";
        emailInput.required = false;
        submitBtn.innerText = "Xác nhận đăng nhập";
        toggleText.innerText = "Chưa có tài khoản";
        toggleLink.innerText = "Đăng ký";
    }
})
//xử lý khi bấm nút xác nhận trong form

function handleAuthSubmit(event) {
    event.preventDefault();

    const username = usernameInput.value;

    isLoggedIn = true;
    closeAuthModal();

    userDisplay.innerText = "Xin chào " + username + " | ";
    userDisplay.style.display = "inline";

    authTrigger.innerText = "Đăng xuất";
    authTrigger.onclick = handleLogout;

    //nếu trước đó khách hàng muốn mua hàng ,giỏ tự động thêm vào giỏ  luôn cho khách hàng
    if (pendingProduct) {
        setTimeout(function () {
            executeAddToCart(pendingProduct);
            pendingProduct = null;
        }, 1000);
    }
}
//hàm logout
function handleLogout() {
    isLoggedIn = false;
    //Trả lại giao diện mặc định
    userDisplay.style.display = "none";
    authTrigger.innerText = "Đăng nhập";
    authTrigger.onclick = openAuthModal;

    cartCount = 0;
    document.getElementById('cart-count').innerText = cartCount;
    showToast("Đã đăng xuất!", "#ff9800");
}

//hiển thị thanh thông báo toast
function showToast(massge, color) {
    const toast = document.getElementById('toast');
    toast.innerText = massage;
    toast.style.backgroundColor = color;

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
        toast.classList.remove('show');
    }, 3000);
}
