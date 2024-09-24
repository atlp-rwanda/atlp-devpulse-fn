export const dataTocsv = (
  obj1: {
    _id: string;
    gender: string;
    Address: string;
    birth_date: string;
    phone: string;
    field_of_study: string;
    education_level: string;
    province: string;
    district: string;
    sector: string;
    isEmployed: boolean;
    haveLaptop: boolean;
    isStudent: boolean;
    Hackerrank_score: any;
    english_score: any;
    interview_decision: any;
    past_andela_programs: any;
  },
  obj2: {
    lastName: string;
    firstName: string;
    _id: string;
    email: string;
  }
) => {
  let allObjects: any = [];
  let dataList: {
    _id: string;
    gender: string;
    Address: string;
    birth_date: string;
    phone: string;
    field_of_study: string;
    education_level: string;
    province: string;
    district: string;
    sector: string;
    isEmployed: boolean;
    haveLaptop: boolean;
    isStudent: boolean;
    Hackerrank_score: any;
    english_score: any;
    interview_decision: any;
    past_andela_programs: any;
    lastName: string;
    firstName: string;
    email: string;
  }[] = [];
  let traineeObj = Object.assign(obj1, obj2);

  dataList.push(traineeObj);
  let headers: string[] = [
    "First name,last name,email,gender,Address,birth date,phone,field of study,education level,province,district,sector,isEmployed,haveLaptop,isStudent,Hackerrank score,english score,interview decision,past andela programs",
  ];
  for (const item of dataList) {
    let arr: any[] = [];
    arr.push(item.firstName);
    arr.push(item.lastName);
    arr.push(item.email);
    arr.push(item.gender);
    arr.push(item.Address);
    arr.push(item.birth_date);
    arr.push(item.phone);
    arr.push(item.field_of_study);
    arr.push(item.education_level);
    arr.push(item.province);
    arr.push(item.district);
    arr.push(item.sector);
    arr.push(item.isEmployed);
    arr.push(item.haveLaptop);
    arr.push(item.isStudent);
    arr.push(item.Hackerrank_score);
    arr.push(item.english_score);
    arr.push(item.interview_decision);
    arr.push(item.past_andela_programs);

    allObjects.push(arr);
  }

  let traineeCsv = dataList.reduce((acc: any, trainee) => {
    const {
      _id,
      gender,
      Address,
      birth_date,
      phone,
      field_of_study,
      education_level,
      province,
      district,
      sector,
      isEmployed,
      haveLaptop,
      isStudent,
      Hackerrank_score,
      english_score,
      interview_decision,
      past_andela_programs,
      lastName,
      firstName,
      email,
    } = trainee;
    acc.push(
      [
        firstName,
        lastName,
        email,
        gender,
        Address,
        birth_date,
        phone,
        field_of_study,
        education_level,
        province,
        district,
        sector,
        isEmployed,
        haveLaptop,
        isStudent,
        Hackerrank_score,
        english_score,
        interview_decision,
        past_andela_programs,
      ].join(",")
    );
    return acc;
  }, []);

  downloadFile({
    data: [...headers, ...traineeCsv].join("\n"),
    fileName: `trainee_${traineeObj.firstName}`,
    fileType: "text/csv",
  });
};

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });

  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};
