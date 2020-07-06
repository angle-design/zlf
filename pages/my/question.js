// pages/my/question.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
    onelist:[
      {
        xu:'Q1',
        text:'国（境）外学历学位认证书有什么用途？',
        content:'国（境）外学历学位认证工作旨在落实国家留学政策，促进教育国际交流。国（境）外学历学位认证书是对国（境）外颁证机构的合法性、文凭证书的真实性、国（境）外文凭证书与我国学历学位的对应关系提供咨询意见。',
        showflag:true
      },
      {
        xu:'Q2',
        text:'国（境）外学历学位认证是否为强制性要求？',
        content:'国（境）外学历学位认证是申请者的自愿行为，不具强制性。',
        showflag:false
      },
      {
        xu:'Q3',
        text:'获得国（境）外学历学位证书后多长时间内必须申请认证？',
        content:'国（境）外学历学位认证是申请者的自愿行为，只要申请材料齐全，随时可申请认证。鉴于学历认证调研需要一定时间，建议申请者获得学位证书后尽早申请学历学位认证。',
        showflag:false
      },
      {
        xu:'Q4',
        text:'如果在国（境）外学习获得多个国（境）外学历学位证书，所有证书都需要进行认证吗?',
        content:'国（境）外学历学位认证是申请者的自愿行为，不具强制性，可根据申请者的实际需求申请。申请者可以在同一个认证账户下同时提交多个文凭证书的认证申请。如需认证多个文凭证书，请务必每个文凭证书单独提交认证申请，请勿在一个认证申请里上传多个文凭证书。',
        showflag:false
      },
      {
        xu:'Q5',
        text:'有些国家的高等教育机构没有在中国留学网或教育部涉外监管信息网上公布，是否意味着该国学历学位不能进行认证？',
        content:'教育涉外监管信息网上公布的外国高校名单是供公众查询的参考名单。国(境)外学历学位认证按照《教育部留学服务中心国(境)外学历学位认证评估办法》对国外院校的资质进行核查，并对符合认证标准的院校提供认证服务。我中心的认证范围和涉外监管网的名单会存在差异。',
        showflag:false
      },
      {
        xu:'Q6',
        text:'已获得学位，但暂时未颁发国（境）外学历学位证书能进行学历学位认证吗？',
        content:'申请者如已被授予学位，但尚未正式获颁文凭证书，我中心原则上无法提供认证服务。考虑到有些国家（地区）的高校在学生在获得学位后数月、甚至数年后才能颁发证书，为便利留学回国人员就业，如确系有入职、升学等迫切需求且预计证书颁授时间间隔较长的的申请者，可提供急需认证服务的合理化证明材料（如用人单位函件、录取通知、考试通知等），持院校注册部门开具的官方证明信，在线提交认证申请。“证明信”内容应包含申请者所获学位/文凭名称、被授予的具体时间、证书预计颁发时间等内容，部分国别可能需要额外提交其他申请材料，以申请系统中的提示为准。',
        content1:'请注意，此类“证明信”往往核查困难，因此评估时间有可能超出文凭证书的正常认证周期，甚至可能无法通过认证评估；持“证明信”提交申请获得的认证结果与持文凭证书提交申请获得的认证结果有可能存在差异。在认证评估完成后，我中心不再受理要求替换认证对象的复核申请。',
        content2:'仅修读完相关课程，或满足毕业要求，但尚未被正式授予学位的申请，不在我中心认证范围内。但确有回国就业、升学等需求，可商请相关用人单位或高校向我中心来函咨询，认证处将免费向相关用人单位出具说明性质的公函。',
        showflag:false
      },
      {
        xu:'Q7',
        text:'认证评估标准中关于在国(境)外学习时间有具体期限要求吗？',
        content:'因各国学制不同，原则上没有统一的学习期限。我中心主要依据颁发国家（地区）及院校的相关法律或规定，按照《教育部留学服务中心国（境）外学历学位评估办法》进行评估。我中心对每份认证申请均进行个案评估，请以我中心最终出具的认证结果为准。',
        content1:'如果申请者在国境外学习时间明显短于学制要求，建议申请者提交学习期间的正式成绩单；如果申请者就读的课程属于跨境远程，我国在WTO的服务贸易协议中未承诺开放远程教育服务市场，目前国内的其他法律法规也还暂时没有关于认可跨境远程教育的相关规定，因此，认可的条件也尚未成熟；如果申请者的课程涉及中外合作办学，那么申请者参加的项目需符合《中外合作办学条例》及其实施办法。',
        content2:'建议广大留学人员在留学前详细考察，尽量选择质量有保证的课程就读。',
        showflag:false
      },
    ],
    
    twolist:[
      {
        xu:'Q1',
        text:'国外学历学位认证和就业落户手续能否同时办理?',
        content:'不能，国外学历学位认证书是办理就业落户手续时审核的重要文件之一，所以要在获得国外学历学位认证书之后，才能申请办理就业落户手续。',
        showflag:false
      },
      {
        xu:'Q2',
        text:'各阶段学位均在国外获得，办理就业落户手续时是否需要认证所有学位？',
        content:'只需要认证最高学位，上传材料时需提供其他学位的学位证书材料。',
        showflag:false
      },
      {
        xu:'Q3',
        text:'申请办理在京就业落户手续是否有年龄限制？',
        content:'根据北京市相关规定，只有45周岁（含）以下非北京户籍留学回国人员才可以申请办理在京就业落户手续。',
        showflag:false
      },
    ],
    threelist:[
      {
        xu:'Q1',
        text:'教育部留学服务中心在外省（市）是否有分支机构代办留学 人员存档业务？',
        content:'没有。教育部留学服务中心留学人员档案室只设在北京。地址：北京市海淀区北四环西路56号，辉煌时代大厦6层。',
        showflag:false
      },
      {
        xu:'Q2',
        text:'出国留学人员必须将档案存放在教育部留学服务中心吗?',
        content:'出国留学人员的档案不是必须存放在教育部留学服务中心。您可以选择存放在原户籍地档案保管机构即人力资源公共服务机构。另外在出国留学期间档案和户口最好在同一地，以便今后回国办理各项手续。',
        showflag:false
      },
      {
        xu:'Q3',
        text:'将档案存放在教育部留学服务中心与存放在户籍所在地档案保管机构有何区别？对今后回国办理其它手续是否有影响？',
        content:'出国留学人员将档案存放在留学服务中心与存放在户籍所在地档案保管机构，是没有本质区别的。且对今后您学成回国办理学历学位认证、就业报到证等相关手续均无任何影响。',
        showflag:false
      },
      {
        xu:'Q4',
        text:'自费出国留学人员的档案存放在教育部留学服务中心，党员组织关系可一并转入吗？',
        content:'不能转入我中心。根据中组部“组通字【2015】33号”文《中共中央组织部关于做好高校毕业生党员组织关系管理工作的通知》的规定，我处不接收党员组织关系。党员组织关系已转至我处的留学人员，可待回国就业办理档案转出时一并将党员组织关系转出。',
        showflag:false
      },
      {
        xu:'Q5',
        text:'个人能保管自己的档案吗？如果出国留学时档案一直在个人手中保管，能到教育部留学服务中心直接将档案存入吗？',
        content:'没有。教育部留学服务中心留学人员档案室只设在北京。',
        content1:'地址：北京市海淀区北四环西路56号，辉煌时代大厦6层。',
        showflag:false
      },
      {
        xu:'Q6',
        text:'我是出国（境）留学前将档案存放在留学服务中心的，但我现在没有回国，想把档案迁回户籍地，如何办理？',
        content:'您这种特殊情况最好先通过电子邮件咨询我处，我处工作人员将根据您具体情况，提供档案调转建议。之后，再提交线上的转出申请。',
        showflag:false
      },
      {
        xu:'Q7',
        text:'我在留学服务中心办理完《回国工作就业报到证》后，何时办理档案转出？',
        content:'分两种情况：',
        content1:'（1）出国前北京户籍的留学人员（包含回户籍地就业的留学人员），在留学服务中心回国处办理完《留学人员回国工作就业报到证》后，请在收到《留学人员回国工作就业报到证》之日起40天内，登陆留学政务服务平台-档案业务-档案转出，提交转出申请。',
        content2:'（2）出国前外非北京户籍的留学人员：您在收到教育部留学服务中心回国处出具的《留学人员回国工作就业报到证》和《落户介绍信》后，于《留学人员回国工作就业报到证》落款日期起40天内，登陆留学政务服务平台-档案业务-档案转出，提交转出申请。您落户手续的办理时间及流程，请咨询工作单位或人事代理机构。',
        showflag:false
      }
    ],
    fourlist:[
      {
        xu:'Q1',
        text:'如何办理签证？',
        content:'根据各国驻华使馆的签证政策和要求，我们可代办部分国家的签证，主要包括：新西兰、芬兰、挪威等，请赴这些国家的申请人按照我处网页要求准备办理签证所需材料并提交至我处。有些国家要求申请人亲自赴使馆或签证申请中心进行面谈或留取指纹，主要包括：美国、加拿大、英国、德国等，前往这些国家的申请人则需要自行办理签证。',
        showflag:false
      },
      {
        xu:'Q2',
        text:'签证材料提交至出国处后，如何了解签证办理的进程？',
        content:'由我处代办签证的留学人员，在签证办好后，我处将通过“留学政务服务平台-公派留学系统”，给您发送短信和电子邮件通知。由于个别国家签证办理周期较长，如北欧等国，申请人如长时间（3个月以上）没有得到我处或使馆关于签证相关通知，建议将您的情况发邮件至chuguo1@cscse.edu.cn，我处在接到您的邮件后会尽快赴使馆进行查询。',
        showflag:false
      },
      {
        xu:'Q3',
        text:'我何时可以拿到签证？',
        content:'签证审批权由使馆签证官掌握，我处无法也无权得知签证办好的具体时间。但您的签证一旦签批，我处外勤工作人员会尽快赴使馆或签证中心取回，并通知留学人员。',
        showflag:false
      },
      {
        xu:'Q4',
        text:'自办签证人员的签证费如何支付？',
        content:' 自行办理签证的留学人员，需先行垫付签证费用。我处会凭签证费凭证为您办理报销手续。',
        showflag:false
      },
      
     
    ],
  },
  
  toToggle:function(e){
    let a_index=e.currentTarget.dataset.index;
    let that=this;
    that.data.onelist[a_index].showflag=!that.data.onelist[a_index].showflag;
    this.setData({
      onelist:that.data.onelist
    })
  },
  toToggletwo:function(e){
    let a_index=e.currentTarget.dataset.index;
    let that=this;
    that.data.twolist[a_index].showflag=!that.data.twolist[a_index].showflag;
    this.setData({
      twolist:that.data.twolist
    })
  },
  toTogglethree:function(e){
    let a_index=e.currentTarget.dataset.index;
    let that=this;
    that.data.threelist[a_index].showflag=!that.data.threelist[a_index].showflag;
    this.setData({
      threelist:that.data.threelist
    })
  },
  toTogglefour:function(e){
    let a_index=e.currentTarget.dataset.index;
    let that=this;
    that.data.fourlist[a_index].showflag=!that.data.fourlist[a_index].showflag;
    this.setData({
      fourlist:that.data.fourlist
    })
  },
  toservice:function(){
    wx.navigateTo({
      url: '/pages/my/service',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})