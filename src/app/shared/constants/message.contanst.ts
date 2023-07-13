export enum MESSAGE_TITLE {
    SUCCESS = 'Success',
    ADD_SUCCESS = 'Add Success',
    APPROVE_SUCCESS = 'Approve Success',
    DELETE = 'Delete',
    ERROR = 'Error',
    WARNING = 'Warning',
    SAVE_SUCC = 'Save successfully !',
    PICK_SUCC = 'Choosed icon',
    PICK_ERROR = 'Error icon',
    ADD_SUCC = 'Successfully added!',
    SAVE_ERR = 'Save error !',
    SAVE_ERR_TIME = 'Save error time',
    CANT_API = 'Unable to connect to API!',
    DELETE_SUCC = 'Delete successfully!',
    DELETE_ERR = 'Delete error !',
    LOGIN_ERR = 'Login error !',
    LOGIN_SUCC = 'Login successfully !',
    REGIS_SUCC = 'Register successfully !',
    REGIS_ERR = 'Register error !',
    PARAM_ERR = 'Get param is error',
    CHANGEPASS_SUCC = 'Change Password successfully !',
    CANCEL = 'Cancel',
    CANCELED = 'Canceled',
    Duplicate = 'Duplicate',
    EMAIL = 'Duplicate Email !',
    CONTRACTFROM = 'Contract form is required !',
    CAN_NOT_FIND_MESSAGE = 'Can not find message !',
    EDIT = 'Edit',
    EDIT_SUCC = 'Edit_Succ',
    EDIT_ERR = 'Edit_Err',
    ADD_NEW_BRANCH_SUCC = 'Add new branch successful',
    EDIT_BRANCH_SUCC = 'Edit branch successful',
    ADD_NEW_BRANCH_ERR = 'Add new branch error',
    EDIT_BRANCH_ERR = 'Edit branch error',
    CONFIRM_DELETE = 'Are you sure you want to delete customer: ',
}

export enum MESSAGE_ERROR_INPUT {
    VALID = 'Input fields are incorrect',
    MIN_LENGTH_NAME = 'Name enter at least 4 characters',
    MIN_LENGTH_PASSWORD = 'Password enter at least 8 characters',
    MIN_LENGTH_USERNAME = 'Username enter at least 8 characters',
    USERNAME_EXISTS = 'Username already exists',
    PASSWORD_OR_USERNAME_EMPTY = 'username or password not entered',
    ID_ALREADY_EXISTS = 'Id already exists',
    ID_DOES_NOT_EXISTS = "Id doesn't exist",
    EMAIL_ALREADY_EXISTS = 'Email already exists',
}

export const MESSAGE_ERROR = [
    {
        id: 'VALID_001',
        message_VN: 'Lỗi trùng ID',
        message_EN: 'Duplicate ID',
        message_JP: 'IDが重複しています',
    },
    {
        id: 'VALID_002',
        message_VN: 'Lỗi trùng ID',
        message_EN: 'Duplicate ID',
        message_JP: 'IDが重複しています',
    },
    {
        id: 'VALID_022',
        message_VN: 'Lỗi trùng số hợp đồng',
        message_EN: 'Duplicate Contract Number',
        message_JP: '契約番号の重複',
    },
    {
        id: 'VALID_023',
        message_VN: 'Lỗi trùng ID',
        message_EN: 'Duplicate ID',
        message_JP: 'IDが重複しています',
    },
    {
        id: 'VALID_024',
        message_VN: 'Lỗi kích thước file quá lớn',
        message_EN: 'This file is over size',
        message_JP: 'このファイルはサイズが大きすぎます',
    },
    {
        id: 'USR_001',
        message_VN: 'Không tìm thấy người dùng',
        message_EN: 'User Not Found',
        message_JP: 'ユーザーが見つかりません',
    },
    {
        id: 'USR_002',
        message_VN: 'Thay đổi mật khẩu không thành công',
        message_EN: 'Change Password Failure',
        message_JP: 'パスワードの変更の失敗',
    },
    {
        id: 'NP001L',
        message_VN: 'Đăng ký thời gian thất bại',
        message_EN: 'Time registration failed',
        message_JP: '時刻登録失敗',
    },
    {
        id: 'NP002L',
        message_VN: 'Đăng ký thời gian thất bại',
        message_EN: 'Time registration failed',
        message_JP: '時刻登録失敗',
    },
    {
        id: 'NP003L',
        message_VN: 'Đăng ký thời gian thất bại',
        message_EN: 'Time registration failed',
        message_JP: '時刻登録失敗',
    },
    {
        id: 'NP004L',
        message_VN: 'Cập nhật thời gian thất bại',
        message_EN: 'Update Time Failure',
        message_JP: '更新時間の失敗',
    },
    {
        id: 'NP005L',
        message_VN: 'Cập nhật thời gian thất bại',
        message_EN: 'Update Time Failure',
        message_JP: '更新時間の失敗',
    },
    {
        id: 'NP006L',
        message_VN: 'Đăng ký thời gian thất bại',
        message_EN: 'Time registration failed',
        message_JP: '時刻登録失敗',
    },
    {
        id: 'NP007L',
        message_VN: 'Không đủ quyền ',
        message_EN: 'No authority ',
        message_JP: '権限がない',
    },
    {
        id: 'NP008L',
        message_VN: 'Ngày hôm nay không làm việc',
        message_EN: 'Not working today',
        message_JP: '今日は仕事がありません',
    },

    {
        id: 'NP009L',
        message_VN: 'Đăng ký thời gian thất bại',
        message_EN: 'Time registration failed',
        message_JP: '時刻登録失敗',
    },

    {
        id: 'canAdd',
        message_VN: 'Không có quyền hạng để thao tác',
        message_EN: 'No rank to manipulate',
        message_JP: '操作するランクなし',
    },
    {
        id: 'add file err',
        message_VN: 'Dung lượng tệp quá lớn',
        message_EN: 'File size too large',
        message_JP: 'ファイルサイズが大きすぎます',
    },
    {
        id: 'VALID_026',
        message_VN: 'Lỗi không thể xoá khách hàng',
        message_EN: 'Error cannot delete customer',
        message_JP: 'エラーで顧客を削除できません',
    },
];
export const MESSAGE_TRANS_COMMON = [
    {
        id: 'Permission',
        message_VN: 'Quyền truy cập đã được cập nhật thành công',
        message_EN: 'Permission for access has been updated successfully',
        message_JP: 'アクセス許可が正常に更新されました',
    },
    {
        id: 'Error',
        message_VN: 'Lỗi',
        message_EN: 'Error',
        message_JP: 'エラー',
    },
    {
        id: 'Error icon',
        message_VN: 'Bạn chưa chọn icon!',
        message_EN: 'You have not selected the icon!',
        message_JP: 'アイコンを選択していません',
    },
    {
        id: 'Save error !',
        message_VN: 'Lưu lại lỗi !',
        message_EN: 'Save error !',
        message_JP: '保存エラー!',
    },
    {
        id: 'Success',
        message_VN: 'Thành công',
        message_EN: 'Success',
        message_JP: 'サクセス',
    },
    {
        id: 'Edit',
        message_VN: 'Cập nhật',
        message_EN: 'Update',
        message_JP: 'アップデート',
    },
    {
        id: 'Edit_Succ',
        message_VN: 'Cập nhật thành công',
        message_EN: 'Update successfully !',
        message_JP: '更新に成功',
    },
    {
        id: 'Edit_Err',
        message_VN: 'Cập nhật thất bại',
        message_EN: 'Update erros!',
        message_JP: 'アップデートに失敗しました',
    },

    {
        id: 'Add Success',
        message_VN: 'Thêm mới thành công!',
        message_EN: 'Successfully Added New!',
        message_JP: '正常に新規追加されました',
    },
    {
        id: 'Approve Success',
        message_VN: 'Đã chấp thuận đơn nghỉ phép!',
        message_EN: 'Leave application approved!',
        message_JP: '申請を承認したままにする',
    },
    {
        id: 'Save successfully !',
        message_VN: 'Lưu lại thành công !',
        message_EN: 'Save successfully !',
        message_JP: 'セーブに成功',
    },
    {
        id: 'Unable to connect to API!',
        message_VN: 'Không thể kết nối với API!',
        message_EN: 'Unable to connect to API!',
        message_JP: 'API に接続できません',
    },
    {
        id: 'Delete successfully!',
        message_VN: 'Xóa thành công!',
        message_EN: 'Delete successfully!',
        message_JP: '削除しました',
    },
    {
        id: 'Login error !',
        message_VN: 'Lỗi đăng nhập!',
        message_EN: 'Login error !',
        message_JP: 'ログインエラー ！',
    },
    {
        id: 'Choosed icon',
        message_VN: 'Chọn icon thành công!',
        message_EN: 'Icon selected!',
        message_JP: 'アイコンが選択されました',
    },
    {
        id: 'NP001B',
        message_VN: 'Lưu lại lỗi !',
        message_EN: 'Save error !',
        message_JP: '保存エラー!',
    },
    {
        id: 'NP001A',
        message_VN: 'Cập nhật thất bại',
        message_EN: 'Update erros!',
        message_JP: 'アップデートに失敗しました',
    },
    {
        id: 'canAdd',
        message_VN: 'Quyền bị từ chối',
        message_EN: 'Rights denied',
        message_JP: '権利が拒否されました',
    },
    {
        id: 'add file err',
        message_VN: 'Thêm tệp thất bại',
        message_EN: 'Add file failed',
        message_JP: 'ファイルの追加に失敗しました',
    },
    {
        id: 'Read notify error',
        message_VN: 'Đọc thông báo thất bại',
        message_EN: 'Read notify error',
        message_JP: '失敗メッセージの読み取り',
    },
    {
        id: 'Add new branch successful',
        message_VN: 'Thêm mới chi nhánh thành công',
        message_EN: 'Add new branch successful',
        message_JP: '失敗メッセージの読み取り',
    },
    {
        id: 'Edit branch successful',
        message_VN: 'Chỉnh sửa chi nhánh thành công',
        message_EN: 'Edit branch successful',
        message_JP: '失敗メッセージの読み取り',
    },
    {
        id: 'Add new branch error',
        message_VN: 'Thêm mới chi nhánh không thành công',
        message_EN: 'Add new branch error',
        message_JP: '失敗メッセージの読み取り',
    },
    {
        id: 'Edit branch error',
        message_VN: 'Chỉnh sửa chi nhánh không thành công',
        message_EN: 'Edit branch error',
        message_JP: '失敗メッセージの読み取り',
    },
];

export const MESSAGE_NAME = [
    {
        id: 'NP001B',
        message_VN:
            'Phòng họp đã được đặt trong thời gian này. Vui lòng nhập thời gian khác !',
        message_EN:
            'Meeting rooms were booked during this time. Please enter another time !',
        message_JP:
            'この時間帯に会議室が予約されました。別の時間を入力してください !',
    },
    {
        id: 'NP001A',
        message_VN:
            'Phòng họp đã được đặt trong thời gian này. Vui lòng nhập thời gian khác !',
        message_EN:
            'Meeting rooms were booked during this time. Please enter another time !',
        message_JP:
            'この時間帯に会議室が予約されました。別の時間を入力してください !',
    },
];
