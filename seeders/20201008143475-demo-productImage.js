"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [
      {
        productId: 1,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F02_00e43_TKZ4o5yGqgjqyYskL87uor7Y.jpeg?alt=media&token=1bf705f6-ad57-4188-ae0d-5a03b7dc9d31",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F02_0200e_Ko4U7UFTmCqVbXPW2suW3yWj.jpeg?alt=media&token=0ff6177e-1fd0-4171-90d8-1e7cd128d57a",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F02_02564_QCXcmjM5SLaNwybzxewbDnmu.jpeg?alt=media&token=3fca9b48-55da-4e7b-8c1e-8782bcdf4958",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2FP0%20(1).jpg?alt=media&token=06dbc919-4244-4bdc-afed-4cf74aadedf5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2FP0%20(2).jpg?alt=media&token=d7b81607-37df-4096-b8bb-25c3ef669603",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2FP0%20(3).jpg?alt=media&token=07c7e2f5-31dc-40ca-af31-74c74503f6d1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fcaro-txs-04.jpg?alt=media&token=ccb283a0-c5e3-425c-b933-0d81baff6dc4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fcaro-txs-03.jpg?alt=media&token=bf9546e3-e71e-4600-a878-60c70d1ab447",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.1265107476_ngs4.jpg?alt=media&token=7adc890d-bf34-4349-b55b-8a417dacbd55",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.1265107540_dhh6.jpg?alt=media&token=36f6e599-7675-4ff3-a033-b3c68e3edfb4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.1312340959_biaa.jpg?alt=media&token=85d0034c-dc84-452c-9498-2d66b81d3041",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.1456509424_psmb.jpg?alt=media&token=1c09798e-5894-4df7-ab2e-bbc1f48cec1a",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.1456509570_ks1s.jpg?alt=media&token=a10efde6-57d5-471b-9050-60170fac7b44",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.1503763303_9yy2.jpg?alt=media&token=2dad6521-b3d7-4a73-97e4-9e4a9faf4017",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 6,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2026457396_2o8g.jpg?alt=media&token=de3e762b-7979-4247-a826-9e51e9cf4947",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 6,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2074060863_gfvg.jpg?alt=media&token=c887051c-359e-4adc-883d-134495ab35d3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 6,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2074060869_m9nm.jpg?alt=media&token=2c6b7229-75a7-44b4-9929-103cb325cc1c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 7,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2077986602_mssc.jpg?alt=media&token=b9dc8128-b968-483e-81cb-55175bcef98f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 7,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2077986630_d6sr.jpg?alt=media&token=5e3b43db-f229-4c4a-ae9e-018714afc9c5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 7,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2077986646_l0zt.jpg?alt=media&token=c0dcbc96-a07d-4230-9e8b-c77a93672da8",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 7,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2125548277_2r3t.jpg?alt=media&token=e77273d5-db81-4f91-be30-ed39ef07abbc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 8,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2279649532_guon.jpg?alt=media&token=7b4d6350-6da9-4432-9e9e-ac1f9748c409",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 8,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2276895940_krbu.jpg?alt=media&token=4dc06594-992a-4583-bf71-309f51ec1316",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 8,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2276883702_82em.jpg?alt=media&token=34a734fa-50aa-4890-976a-cf58e125247d",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 9,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2309486907_szoj.jpg?alt=media&token=cb3a519b-1f84-480f-bee1-72505ab5e936",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 9,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2309487317_rmgs.jpg?alt=media&token=b48099ed-c8da-48c7-a7e6-3c825aca4117",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 9,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2327236045_qj29.jpg?alt=media&token=ea78efc4-be4d-4630-a576-78360b7fd3ec",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 10,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2391780282_ip3z.jpg?alt=media&token=eb43c363-97b6-496e-9957-c3b93b6c59e7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 10,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2391780358_2uo3.jpg?alt=media&token=907ceb1f-c91d-45f3-9746-ec2e8208d270",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 10,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2391780402_1hi1.jpg?alt=media&token=ea6b01fc-5c17-489f-94c7-beef061a3842",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 10,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2391785742_pgpo.jpg?alt=media&token=fbf4c5b0-75dc-4c14-b534-a60316db9d07",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 11,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2603902499_2qd9.jpg?alt=media&token=02eeaec5-94f1-4217-8017-4673f3310dd2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 11,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2603902565_pmqt.jpg?alt=media&token=a808c1b7-4feb-4f4e-a65f-0d2a98a858f6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 11,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2603902567_pcij.jpg?alt=media&token=fb3fc3ee-25f0-491c-bdf0-14f9e9b676a2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 12,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Foriginal%20(1).jpg?alt=media&token=a4cb16d6-f851-4a06-b4fc-0c843a92a100",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 12,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Foriginal%20(2).jpg?alt=media&token=0b9211d9-95ad-4947-a30e-b62385696011",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 12,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Foriginal%20(3).jpg?alt=media&token=1b523cf9-7f2d-4527-9939-acd9ad0f0640",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 12,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Foriginal%20(4).jpg?alt=media&token=bf035992-1870-4e06-8483-63e57930e7b7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 13,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fpoison-butterfly-dress-black-punk-rave%20(2).jpg?alt=media&token=557e2773-55d3-4d4c-b233-484831da2193",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 13,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fpoison-butterfly-dress-black-punk-rave%20(1).jpg?alt=media&token=398370a7-8a39-43cf-9259-3e1c8bd52b3b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 14,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F01_010f1_tMQePmhwSBv2Vw1i5HUV78Kt.jpeg?alt=media&token=52bba846-53ae-4818-9ee0-91c365a9f308",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 14,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F02_0160c_tsyGwpP7LWS9XkjguMjV58wD.jpeg?alt=media&token=ed3953f4-3d8d-4cda-8472-035a17f9f431",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 15,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F02_00512_cQapMkxp6g3gKoGi78nP53vE.jpeg?alt=media&token=3f0ff137-6957-49d2-a0bb-88002835d182",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 15,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F02_0183c_SnZfxrr7JnL5tYdqgP9TrG7V.jpeg?alt=media&token=704b8b0f-7931-422c-b134-295d3b7a6b05",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 16,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F02_00b75_T2ZCCsFxsc6h55toG5QnRaoX.jpeg?alt=media&token=c92c0100-6ccf-4aaa-ae73-a84938ebddbe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 16,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2F02_026c9_wgDgpD9TbnBE7BvGu3n6u1wf.jpeg?alt=media&token=7efa2bbf-2502-4084-9cc9-5c4e11e6d04a",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 17,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.1852370231_b01b.jpg?alt=media&token=9455582c-0a5a-4fbb-b71a-548bd72cc641",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 18,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2069545629_13rl.jpg?alt=media&token=3fa36e34-4a97-49e4-b8b0-f9c16304f981",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 18,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2098255951_2cdl.jpg?alt=media&token=0b1ee64a-6e53-4b94-a3b8-8c935468c19e",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 18,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/shopping-2f222.appspot.com/o/products%2Fil_794xN.2021943950_3inb.jpg?alt=media&token=96d3b0df-5e33-47a8-9c1f-99ab831182f7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert("ProductImages", users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProductImages", null, {});
  },
};
