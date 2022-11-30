/** Search.tsx에서 각 분과의 데이터를 저장할 때 쓰임,
 * 예시 : { subjectCode: "GS", korean: "기초", fullKorean: "기초교육학부", id: 1 }, */
export interface IDepartment {
    subjectCode: string;
    korean: string;
    fullKorean: string;
    id: number;
}

/** Search.tsx에서 DepartmentGridItemWrapComponent 컴포넌트에 분과 정보와 텍스트, 아이콘 컬러를 전달하기 위해 쓰임 */
export interface IDepartmentGridItemWrapComponent {
    item: IDepartment;
    iconColor: string;
    textColor: string;
}

/** Search.tsx에서 (임시로 쓰일진 모르겠지만 어쨌든) 각 SearchCard.tsx로 전달해야 하는 오브젝트 형식 */
export interface ISearchCard {
    id:number;
    subjectCode: string;
    professorName: string;
    subjectName: string;
    subjectScore: string;
}

