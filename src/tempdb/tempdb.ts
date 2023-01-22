/** 강의평가 데이터 예시 */
import { ISubjectData } from "../Interfaces/interfaces";

export const tempdb: ISubjectData[] = [
  {
    id: 1,
    subjectName: "거시경제학",
    professorName: "김상호",
    subjectCode: "EB2724",
    hexData: [
      {
        subject: "수업 난이도",
        score: 1.7,
      },
      {
        subject: "유익함",
        score: 2.3,
      },
      {
        subject: "성적 만족도",
        score: 3.5,
      },
      {
        subject: "과제량",
        score: 4.2,
      },
      {
        subject: "재미/흥미",
        score: 2.9,
      },
      {
        subject: "강의력",
        score: 5.0,
      },
    ],

    oneLineReview: [
      {
        id: 1,
        recommend: true,
        year: 2021,
        semester: "가을",
        like: 1212,
        dislike: 10,
        content: [
          "여름학기를 즐길 생각이라면 로드가 많아서 비추천, 하지만 수업 자체로 놓고 본다면 지스트에서 하는 것보다 환경이 잘 정리되어 있고 신기술 adoption이 빨라 많은 도움이 됨",
        ],
        pushedLike: "none",
        isLocked: false,
      },
      {
        id: 2,
        recommend: false,
        year: 2020,
        semester: "1",
        like: 871,
        dislike: 169,
        content: ["이분 수업 늦게 끝내주셔서 밥을 제때 못먹음 진짜 미쳐버림림"],
        pushedLike: "like",
        isLocked: false,
      },
      {
        id: 3,
        recommend: false,
        year: 2021,
        semester: "2",
        like: 5,
        dislike: 77,
        content: [
          "진짜 가슴이 웅장해진다... 강의 실화냐?? 정말 세계관 최강자의 강의이다...",
        ],
        pushedLike: "dislike",
        isLocked: false,
      },
    ],

    detailedReview: [
      {
        id: 1,
        recommend: false,
        year: 2021,
        semester: "2",
        like: 1212,
        dislike: 898,
        content: [
          "모두 객관식으로 나옵니다. OX퀴즈도 포함되는데 OX퀴즈는 틀리면 오히려 점수가 깎이는 특이한 메커니즘을 가지고 있습니다. 그니까 확실하지 않으면 OX퀴즈에서는 그냥 답 표시 안하는게 이득임.",
          "과제가 진짜 개많습니다. 일주일에 하나씩 나가는데 진짜 하는데 한세월걸림 / 리포트 작성 형식인데, 한번당 1000단어 이상이라서 진짜 어질어질함 그래도 얻어가는 건 있음",
          "첫째로 교수님 심기를 건드리지 마세유. 둘째로 과제를 척척 잘 내세유. 시험을 겁나 잘 보면 됩니다. 간단하쥬?",
        ],
        pushedLike: "none",
        isLocked: false,
      },
      {
        id: 2,
        recommend: true,
        year: 2021,
        semester: "2",
        like: 512,
        dislike: 10,
        content: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus metus arcu, sollicitudin sit amet tempor id, fringilla at leo. Sed sodales mi libero. Mauris metus ex, condimentum at orci in, volutpat varius sapien. .",
          "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque semper lacus sit amet enim tempus dapibus.",
          "Aliquam diam est, interdum sed diam at, auctor elementum turpis. Sed scelerisque, justo sit amet tincidunt iaculis, lectus enim facilisis ex, vulputate efficitur lorem purus nec ipsum. Sed id purus sed purus laoreet maximus in sed sapien.\n" +
            "Ut sem turpis, dignissim vel sapien non, mattis tristique tortor.",
        ],
        pushedLike: "none",
        isLocked: true,
      },
    ],
  },
  {
    id: 2,
    subjectName: "생명과학의 정량적 이해",
    professorName: "엄수현",
    subjectCode: "BS2201",
    hexData: [
      {
        subject: "수업 난이도",
        score: 5.0,
      },
      {
        subject: "유익함",
        score: 2.7,
      },
      {
        subject: "성적 만족도",
        score: 5.0,
      },
      {
        subject: "과제량",
        score: 2.7,
      },
      {
        subject: "재미/흥미",
        score: 5.0,
      },
      {
        subject: "강의력",
        score: 2.7,
      },
    ],

    oneLineReview: [
      {
        id: 1,
        recommend: true,
        year: 2021,
        semester: "가을",
        like: 1212,
        dislike: 10,
        content: [
          "여름학기를 즐길 생각이라면 로드가 많아서 비추천, 하지만 수업 자체로 놓고 본다면 지스트에서 하는 것보다 환경이 잘 정리되어 있고 신기술 adoption이 빨라 많은 도움이 됨",
        ],
        pushedLike: "none",
        isLocked: false,
      },
      {
        id: 2,
        recommend: false,
        year: 2020,
        semester: "1",
        like: 871,
        dislike: 169,
        content: ["이분 수업 늦게 끝내주셔서 밥을 제때 못먹음 진짜 미쳐버림림"],
        pushedLike: "like",
        isLocked: false,
      },
      {
        id: 3,
        recommend: false,
        year: 2021,
        semester: "2",
        like: 5,
        dislike: 77,
        content: [
          "진짜 가슴이 웅장해진다... 강의 실화냐?? 정말 세계관 최강자의 강의이다...",
        ],
        pushedLike: "dislike",
        isLocked: false,
      },
    ],

    detailedReview: [
      {
        id: 1,
        recommend: false,
        year: 2021,
        semester: "2",
        like: 1212,
        dislike: 898,
        content: [
          "모두 객관식으로 나옵니다. OX퀴즈도 포함되는데 OX퀴즈는 틀리면 오히려 점수가 깎이는 특이한 메커니즘을 가지고 있습니다. 그니까 확실하지 않으면 OX퀴즈에서는 그냥 답 표시 안하는게 이득임.",
          "과제가 진짜 개많습니다. 일주일에 하나씩 나가는데 진짜 하는데 한세월걸림 / 리포트 작성 형식인데, 한번당 1000단어 이상이라서 진짜 어질어질함 그래도 얻어가는 건 있음",
          "첫째로 교수님 심기를 건드리지 마세유. 둘째로 과제를 척척 잘 내세유. 시험을 겁나 잘 보면 됩니다. 간단하쥬?",
        ],
        pushedLike: "none",
        isLocked: false,
      },
    ],
  },
  {
    id: 3,
    subjectName: "생유기화학과 바이오의약품",
    professorName: "서지원",
    subjectCode: "CH4205",
    hexData: [
      {
        subject: "수업 난이도",
        score: 3,
      },
      {
        subject: "유익함",
        score: 2,
      },
      {
        subject: "성적 만족도",
        score: 1,
      },
      {
        subject: "과제량",
        score: 3,
      },
      {
        subject: "재미/흥미",
        score: 2,
      },
      {
        subject: "강의력",
        score: 1,
      },
    ],

    oneLineReview: [
      {
        id: 1,
        recommend: true,
        year: 2021,
        semester: "가을",
        like: 1212,
        dislike: 10,
        content: [
          "여름학기를 즐길 생각이라면 로드가 많아서 비추천, 하지만 수업 자체로 놓고 본다면 지스트에서 하는 것보다 환경이 잘 정리되어 있고 신기술 adoption이 빨라 많은 도움이 됨",
        ],
        pushedLike: "none",
        isLocked: false,
      },
      {
        id: 2,
        recommend: false,
        year: 2020,
        semester: "1",
        like: 871,
        dislike: 169,
        content: ["이분 수업 늦게 끝내주셔서 밥을 제때 못먹음 진짜 미쳐버림림"],
        pushedLike: "like",
        isLocked: false,
      },
      {
        id: 3,
        recommend: false,
        year: 2021,
        semester: "2",
        like: 5,
        dislike: 77,
        content: [
          "진짜 가슴이 웅장해진다... 강의 실화냐?? 정말 세계관 최강자의 강의이다...",
        ],
        pushedLike: "dislike",
        isLocked: false,
      },
    ],

    detailedReview: [
      {
        id: 1,
        recommend: false,
        year: 2021,
        semester: "2",
        like: 1212,
        dislike: 898,
        content: [
          "모두 객관식으로 나옵니다. OX퀴즈도 포함되는데 OX퀴즈는 틀리면 오히려 점수가 깎이는 특이한 메커니즘을 가지고 있습니다. 그니까 확실하지 않으면 OX퀴즈에서는 그냥 답 표시 안하는게 이득임.",
          "과제가 진짜 개많습니다. 일주일에 하나씩 나가는데 진짜 하는데 한세월걸림 / 리포트 작성 형식인데, 한번당 1000단어 이상이라서 진짜 어질어질함 그래도 얻어가는 건 있음",
          "첫째로 교수님 심기를 건드리지 마세유. 둘째로 과제를 척척 잘 내세유. 시험을 겁나 잘 보면 됩니다. 간단하쥬?",
        ],
        pushedLike: "none",
        isLocked: false,
      },
    ],
  },
];
