const pelUtil = require('../../../utils/peopleBasicInfo.js');
const util = require('../../../utils/util.js');
//多级联动 初始化
const columns = [
  {
    values: Object.keys(pelUtil.household),
    className: 'column1'
  },
  {
    values: Object.keys(pelUtil.household['北京']),
    className: 'column2',
    defaultIndex: 2
  },
  {
    values: pelUtil.household['北京']['北京市'],
    className: 'column3',
    defaultIndex: 3
  }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isread:false,

    errorMessage: "",
    errorColor: false,
    isDatePicker: false,
    pickerShow: false,
    pickerTitle: "",
    pickerName: "",
    pickerColumns: [],

    username: "",
    oldname: "",
    phone: "",
    sex: "",
    height: "",
    nation: "",
    birth: "",
    household: "",
    householdNum: "",
    education: "",
    political: "",
    blood: "",
    marriage: "",
    faith: "",
    military: "",
    mailbox: "",
    urgentName: "",
    urgentPhone: "",

    currentDate: new Date().getTime(),
    minDate: new Date("1960-01-01 00:00:00"),//new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },

  onIsreadChange(e){
    this.setData({
      isread:e.detail
    })
  },

  //验证手机号
  invaidPhone(phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        duration: 2000,
        icon: 'none'
      });
      this.setData({
        errorMessage: "手机号格式不正确",
        errorColor: true
      });
      return false;
    }
  },
  //表单选择 
  inputOldName(e) {
    this.setData({
      oldname: e.detail.value
    });
  },
  inputPhoneBlur(e) {
    if (e.detail.value.trim() != "") {
      this.invaidPhone(e.detail.value);
    }

  },
  inputPhone(e) {
    this.setData({
      phone: e.detail.value,
      errorMessage: "",
      errorColor: false
    });
  },
  inputHeight(e) {
    this.setData({
      height: e.detail.value
    });
    console.log(this.data.height)
  },
  onRadioChange(event) {
    this.setData({
      sex: event.detail
    });
  },
  //日期 picker
  onDatePickerCancel(e) {
    this.setData({
      pickerShow: false,
      isDatePicker: false
    });
  },
  onDatePickerConfirm(e) {
    console.log(e.detail)
    this.setData({
      pickerShow: false,
      isDatePicker: false,
      birth: util.formatDate(new Date(e.detail), "-")
    });
  },
  onDatePickeInput(e) {
    this.setData({
      currentDate: e.detail
    });
  },
  //普通picker
  onPickerCancel(e) {
    this.setData({
      pickerShow: false
    });
  },
  onPickerConfirm(e) {
    console.log(e.detail)
    switch (this.data.pickerName) {
      case 'nation':
        this.setData({
          nation: e.detail.value.text
        });
        break;
      // case 'birth':
      //   this.setData({
      //     birth: e.detail.value.text
      //   });
      //   break;
      case 'household':
        this.setData({
          household: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
        });
        break;
      case 'householdNum':
        this.setData({
          householdNum: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
        });
        break;
      case 'education':
        this.setData({
          education: e.detail.value
        });
        break;
      case 'political':
        this.setData({
          political: e.detail.value
        });
        break;
      case 'blood':
        this.setData({
          blood: e.detail.value
        });
        break;
      case 'marriage':
        this.setData({
          marriage: e.detail.value
        });
        break;
      case 'faith':
        this.setData({
          faith: e.detail.value
        });
        break;
      case 'military':
        this.setData({
          military: e.detail.value
        });
        break;
    }
    this.setData({
      pickerShow: false
    });
  },
  //普通picker 多级联动 
  onPickerChange(e) {
    if (this.data.pickerName == "household" && this.data.pickerName == "householdNum") {//不是多级联通的 picker 不用触发此事件
      const { picker, value, index } = e.detail;
      if (index == 0) {
        var co_2 = Object.keys(pelUtil.household[value[0]]);
        picker.setColumnValues(1, Object.keys(pelUtil.household[value[0]]));
        picker.setColumnValues(2, pelUtil.household[value[0]][co_2[0]]);
      } else if (index == 1) {
        console.log(pelUtil.household[value[0]][value[1]])
        picker.setColumnValues(2, pelUtil.household[value[0]][value[1]]);
      }
    }
  },

  //设置 picker内容
  setPicker(title, name, pelUtilValue) {
    this.setData({
      pickerTitle: title,
      pickerName: name,
      pickerColumns: pelUtilValue,
      pickerShow: true
    });
  },
  choiceNation(e) {
    this.setPicker("民族", "nation", pelUtil.nation)
  },
  choiceBirth(e) {
    this.setData({
      isDatePicker: true
    })
    this.setPicker("出生日期", "birth", pelUtil.nation)
  },
  choiceHousehold(e) {
    this.setPicker("户籍地省市区", "household", columns)
  },
  choiceHouseholdNum(e) {
    console.log(columns);
    this.setPicker("户口所在地", "householdNum", columns)
  },
  choiceEducation(e) {
    this.setPicker("文化程度", "education", pelUtil.education)
  },
  choicePolitical(e) {
    this.setPicker("政治面貌", "political", pelUtil.political)
  },
  choiceBlood(e) {
    this.setPicker("血型", "blood", pelUtil.blood)
  },
  choiceMarriage(e) {
    this.setPicker("婚姻状况", "marriage", pelUtil.marriage)
  },
  choiceFaith(e) {
    this.setPicker("宗教信仰", "faith", pelUtil.faith)
  },
  choiceMilitary(e) {
    this.setPicker("兵役状况", "military", pelUtil.military)
  },
  inputMailBox(e) {
    this.setData({
      mailBox: e.detail.value
    });
  },
  inputUrgentName(e) {
    this.setData({
      urgentName: e.detail.value
    });
  },
  inputUrgentPhone(e) {
    this.setData({
      urgentPhone: e.detail.value
    });
  },

  //表单选择 end
  gotonext(e) {
    wx.navigateTo({
      url: '../live/live',
    })
  }




})