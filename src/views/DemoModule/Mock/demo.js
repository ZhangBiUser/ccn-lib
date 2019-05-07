import Mock from 'mockjs'
const Random = Mock.Random;

var GetAll = [];
for (let i = 0; i < 5; i++) {
    let obj = {};
    obj.id = Random.integer(3);
    obj.name11 = Random.cword(10);
    obj.name22 = Random.string(16);
    obj.time1 = Random.datetime();
    if (i == 1 || i == 4) {
        obj.time1 = null;
    }
    obj.name33 = Random.string('upper', 3) + Random.integer(5);
    GetAll.push(obj);
}

var GetBatchList = [
    {
        "nameid": "idid111111111",
        "name33": "idid111111111",
        "name": '产品名称1'
    },
    {
        "nameid": "idid1212121212",
        "name33": "idid1212121212",
        "name": '产品名称2'
    },
    {
        "nameid": "idid1313131313",
        "name33": "idid1313131313",
        "name": '产品名称3'
    }
];

var GetCheckReportServiceById = {
    "id": '1324325',
    // "batchNo": "e3af1edf9b5b474f8ad59fedfde0149b",
    "name33": "e3af1edf9b5b474f8ad59fedfde0149b",
    "imgurl1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABOCAYAAABvwTVMAAAAAXNSR0IArs4c6QAAA5RJREFUaAXtW01oE0EUnpmkKdaAQkEQi6e2eGnrwYN3e/Gu1D9obyWxiQ3tRfHQg3pqaSDJVj1bxEPFk568i3iQghfxqIgI/kCTtslmxveWLrxN201xk/ASZiCdb2dmZ773vrfTOcyTYq8sLi4e3y6Xs/A4JaQcNcYc8/sY1r+lEO/h97i4tvaK8oM2IbLZ7EjddV+DEcO0sxuwkvL52MTE9OzsbA35KlSmW41BA7Qx1zc3N1cQY5G3U6m7RohH3oOUZcALAwMDz5aXl8veCIZ/MpnMkHbdB8B1eo+3TvT3n11dXf0Wh4YpnzMa4zjOE/+Za10oFL4Ct5l0KnUG6kn4VFStVrsIeCOOG4AwYAoUVMYD//lnfn7+ZLVavSqlREeFFmXMj4LjvAwd1KxTynXgPonDtNansY7T3SxqmLmuewkWeApz4tyhRUN453K5NxAm26EDwzu3/O6YEP2Im3rSf+EodbFY3ACSg7FYrOm8yWRya2lpKYoxB1JquvCBb4U0gsd/hXS3vUu1fYUOLxBQCLbwhx1eP9Jy8KWea5wgYBAMuNc4gPXzAZtPb4ccnIvuGymb77lcZNN6DMheo3QCIVd0nK76htLp9BX4vxcwqOdCzhpE45UjtgpxVIVysgpRb3DEViGOqlBOViHqDY7YKsRRFcrJKkS9wRFbhTiqQjlZhag3OGKrEEdVKCerEPUGR2wV4qgK5WQVot7giK1CHFWhnKxC1BscsVWIoyqUk1WIeoMjtgpxVIVysgpRb3DEViGOqlBOViHqDY7YKsRRFcrJKkS9wREH7svB/bM8R5KHcYJMlJHG24oBg+Ay3Z3DXubY3mgMcuy5byigkFQqJ49yz5+JXKDQeaA7Q+kEDCqVSl31DXl3TiFLhRrU2yFHLY2K5+bmLoh6fYjOY5QyiUTiAyYu0fZW4kDItWpiMOaGrtfX982ntdjd2fkLGVojkNT0c19/CxraE3Jaj4ZwOwHJS6dC+iN1tUWheCKRd6vVQS1EIOSAqQYPvi2WSp8isQ55OQ7pZdt+lhdmTEbN8sK18vn8H6gyIeu2qivpT1QXYhexgtPBZ7+xUqnc8nFX1Mbc9Hkqpb4jxpB7Ab8JfICz0Qrs7V5yYSuUwjnbUUja5yTOD1Gm+/r63nnYS5muVD5C2A23Y/FOzAknnAIcCjDtWyhUAo4Ql8HKL51YvNVrYOr0+Pj4gj+vlwuOD72S3P4P4OIMQ+FzJKIAAAAASUVORK5CYII=",
    "billOfEntryImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABOCAYAAABvwTVMAAAAAXNSR0IArs4c6QAAA5RJREFUaAXtW01oE0EUnpmkKdaAQkEQi6e2eGnrwYN3e/Gu1D9obyWxiQ3tRfHQg3pqaSDJVj1bxEPFk568i3iQghfxqIgI/kCTtslmxveWLrxN201xk/ASZiCdb2dmZ773vrfTOcyTYq8sLi4e3y6Xs/A4JaQcNcYc8/sY1r+lEO/h97i4tvaK8oM2IbLZ7EjddV+DEcO0sxuwkvL52MTE9OzsbA35KlSmW41BA7Qx1zc3N1cQY5G3U6m7RohH3oOUZcALAwMDz5aXl8veCIZ/MpnMkHbdB8B1eo+3TvT3n11dXf0Wh4YpnzMa4zjOE/+Za10oFL4Ct5l0KnUG6kn4VFStVrsIeCOOG4AwYAoUVMYD//lnfn7+ZLVavSqlREeFFmXMj4LjvAwd1KxTynXgPonDtNansY7T3SxqmLmuewkWeApz4tyhRUN453K5NxAm26EDwzu3/O6YEP2Im3rSf+EodbFY3ACSg7FYrOm8yWRya2lpKYoxB1JquvCBb4U0gsd/hXS3vUu1fYUOLxBQCLbwhx1eP9Jy8KWea5wgYBAMuNc4gPXzAZtPb4ccnIvuGymb77lcZNN6DMheo3QCIVd0nK76htLp9BX4vxcwqOdCzhpE45UjtgpxVIVysgpRb3DEViGOqlBOViHqDY7YKsRRFcrJKkS9wRFbhTiqQjlZhag3OGKrEEdVKCerEPUGR2wV4qgK5WQVot7giK1CHFWhnKxC1BscsVWIoyqUk1WIeoMjtgpxVIVysgpRb3DEViGOqlBOViHqDY7YKsRRFcrJKkS9wREH7svB/bM8R5KHcYJMlJHG24oBg+Ay3Z3DXubY3mgMcuy5byigkFQqJ49yz5+JXKDQeaA7Q+kEDCqVSl31DXl3TiFLhRrU2yFHLY2K5+bmLoh6fYjOY5QyiUTiAyYu0fZW4kDItWpiMOaGrtfX982ntdjd2fkLGVojkNT0c19/CxraE3Jaj4ZwOwHJS6dC+iN1tUWheCKRd6vVQS1EIOSAqQYPvi2WSp8isQ55OQ7pZdt+lhdmTEbN8sK18vn8H6gyIeu2qivpT1QXYhexgtPBZ7+xUqnc8nFX1Mbc9Hkqpb4jxpB7Ab8JfICz0Qrs7V5yYSuUwjnbUUja5yTOD1Gm+/r63nnYS5muVD5C2A23Y/FOzAknnAIcCjDtWyhUAo4Ql8HKL51YvNVrYOr0+Pj4gj+vlwuOD72S3P4P4OIMQ+FzJKIAAAAASUVORK5CYII=",
    "taxListImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABOCAYAAABvwTVMAAAAAXNSR0IArs4c6QAAA5RJREFUaAXtW01oE0EUnpmkKdaAQkEQi6e2eGnrwYN3e/Gu1D9obyWxiQ3tRfHQg3pqaSDJVj1bxEPFk568i3iQghfxqIgI/kCTtslmxveWLrxN201xk/ASZiCdb2dmZ773vrfTOcyTYq8sLi4e3y6Xs/A4JaQcNcYc8/sY1r+lEO/h97i4tvaK8oM2IbLZ7EjddV+DEcO0sxuwkvL52MTE9OzsbA35KlSmW41BA7Qx1zc3N1cQY5G3U6m7RohH3oOUZcALAwMDz5aXl8veCIZ/MpnMkHbdB8B1eo+3TvT3n11dXf0Wh4YpnzMa4zjOE/+Za10oFL4Ct5l0KnUG6kn4VFStVrsIeCOOG4AwYAoUVMYD//lnfn7+ZLVavSqlREeFFmXMj4LjvAwd1KxTynXgPonDtNansY7T3SxqmLmuewkWeApz4tyhRUN453K5NxAm26EDwzu3/O6YEP2Im3rSf+EodbFY3ACSg7FYrOm8yWRya2lpKYoxB1JquvCBb4U0gsd/hXS3vUu1fYUOLxBQCLbwhx1eP9Jy8KWea5wgYBAMuNc4gPXzAZtPb4ccnIvuGymb77lcZNN6DMheo3QCIVd0nK76htLp9BX4vxcwqOdCzhpE45UjtgpxVIVysgpRb3DEViGOqlBOViHqDY7YKsRRFcrJKkS9wRFbhTiqQjlZhag3OGKrEEdVKCerEPUGR2wV4qgK5WQVot7giK1CHFWhnKxC1BscsVWIoyqUk1WIeoMjtgpxVIVysgpRb3DEViGOqlBOViHqDY7YKsRRFcrJKkS9wREH7svB/bM8R5KHcYJMlJHG24oBg+Ay3Z3DXubY3mgMcuy5byigkFQqJ49yz5+JXKDQeaA7Q+kEDCqVSl31DXl3TiFLhRrU2yFHLY2K5+bmLoh6fYjOY5QyiUTiAyYu0fZW4kDItWpiMOaGrtfX982ntdjd2fkLGVojkNT0c19/CxraE3Jaj4ZwOwHJS6dC+iN1tUWheCKRd6vVQS1EIOSAqQYPvi2WSp8isQ55OQ7pZdt+lhdmTEbN8sK18vn8H6gyIeu2qivpT1QXYhexgtPBZ7+xUqnc8nFX1Mbc9Hkqpb4jxpB7Ab8JfICz0Qrs7V5yYSuUwjnbUUja5yTOD1Gm+/r63nnYS5muVD5C2A23Y/FOzAknnAIcCjDtWyhUAo4Ql8HKL51YvNVrYOr0+Pj4gj+vlwuOD72S3P4P4OIMQ+FzJKIAAAAASUVORK5CYII="
}

//获取检验单列表
Mock.mock('/CheckReportService/GetAll', 'post', (options) => {
    console.log(JSON.parse(options.body));
    return { "result": { "totalCount": Random.integer(1, 100), "items": GetAll }, "success": true, "error": null, "unAuthorizedRequest": false };
});

// 获取批次列表
Mock.mock('/CheckReportService/GetBatchList', 'post', (options) => {
    console.log(JSON.parse(options.body));
    return { "result": GetBatchList, "success": true, "error": null, "unAuthorizedRequest": false };
});

// 检验单新增&编辑
Mock.mock('/CheckReportService/Save', 'post', (options) => {
    console.log(JSON.parse(options.body));
    return { "success": true, "message": "" };
});

// 检验单删除
Mock.mock('/CheckReportService/Delete', 'post', (options) => {
    console.log(JSON.parse(options.body));
    return { "success": true, "message": "" };
});
// 获取单个检验单信息
Mock.mock('/CheckReportService/Get', 'post', (options) => {
    console.log(JSON.parse(options.body));
    return { "result": GetCheckReportServiceById, "success": true, "message": "" };
});