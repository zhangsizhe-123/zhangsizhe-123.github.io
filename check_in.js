// 获取打卡按钮和显示连续打卡天数的元素
const checkInButton = document.getElementById("checkInButton");
const streakMessage = document.getElementById("streakMessage");

// 初始化打卡记录
let checkInRecord = JSON.parse(localStorage.getItem("checkInRecord")) || {
    lastCheckInDate: null, // 最后一次打卡日期
    streak: 0 // 连续打卡天数
};

// 检查是否已经打卡
function checkIfCheckedIn() {
    const today = new Date().toLocaleDateString();

    // 如果今天已经打卡过，则禁用按钮
    if (checkInRecord.lastCheckInDate === today) {
        checkInButton.disabled = true;
        checkInButton.textContent = "已打卡";
        checkInButton.style.backgroundColor = "#ccc";
    }

    // 显示连续打卡天数
    updateStreakMessage();
}

// 打卡功能
function checkIn() {
    const today = new Date().toLocaleDateString();
    const lastCheckInDate = checkInRecord.lastCheckInDate;

    // 如果今天已经打卡过，则提示用户
    if (lastCheckInDate === today) {
        alert("今天已经打卡过了，请明天再来！");
    } else {
        // 检查是否连续打卡
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayFormatted = yesterday.toLocaleDateString();

        if (lastCheckInDate === yesterdayFormatted) {
            // 如果是连续打卡，增加连续打卡天数
            checkInRecord.streak += 1;
        } else {
            // 如果不是连续打卡，重置连续打卡天数
            checkInRecord.streak = 1;
        }

        // 更新最后一次打卡日期
        checkInRecord.lastCheckInDate = today;

        // 保存打卡记录到 localStorage
        localStorage.setItem("checkInRecord", JSON.stringify(checkInRecord));

        // 提示用户打卡成功
        alert(`打卡成功！今天是 ${today}\n连续打卡天数：${checkInRecord.streak}`);

        // 更新按钮状态
        checkInButton.disabled = true;
        checkInButton.textContent = "已打卡";
        checkInButton.style.backgroundColor = "#ccc";

        // 更新连续打卡天数显示
        updateStreakMessage();
    }
}

// 更新连续打卡天数显示
function updateStreakMessage() {
    if (checkInRecord.streak > 0) {
        streakMessage.textContent = `你已经连续打卡 ${checkInRecord.streak} 天！`;
    } else {
        streakMessage.textContent = "今天还没有打卡哦！";
    }
}

// 页面加载时检查是否已经打卡
checkIfCheckedIn();
