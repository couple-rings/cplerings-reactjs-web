import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./WeddingRingsAccordion.module.scss";

const data = [
  {
    title: "Nhẫn cưới khoảng bao nhiêu tiền?",
    content: (
      <div>
        Theo dữ liệu từ thị trường trang sức, giá trung bình của{" "}
        <span>nhẫn cưới cho nữ</span> khoảng 27.000.000 VND, trong khi giá trung
        bình của <span>nhẫn cưới cho nam</span> dao động từ 12 - 14.000.000 VND.
        Giá nhẫn cưới có thể thay đổi đáng kể tùy thuộc vào các yếu tố như loại
        kim loại sử dụng, độ phức tạp của thiết kế, thương hiệu và chất lượng
        kim cương (nếu có).
        <br />
        Thông thường, giá{" "}
        <span>nhẫn cưới dao động từ vài chục đến vài trăm triệu</span> hoặc cao
        hơn. Bạn nên đặt ra một ngân sách cho nhẫn cưới và khám phá các lựa chọn
        phù hợp trong khoảng giá đó.
      </div>
    ),
  },
  {
    title: "Ai là người mua nhẫn cưới?",
    content: (
      <div>
        Truyền thống thường là cô dâu mua nhẫn cưới cho chú rể, và chú rể mua
        nhẫn cưới cho cô dâu. Tuy nhiên, ngày nay nhiều cặp đôi chọn cách tiếp
        cận hiện đại hơn, sử dụng tài khoản chung để mua nhẫn cưới. Việc chia
        đều chi phí nhẫn cưới hoặc nhờ sự đóng góp từ gia đình để mua bộ nhẫn
        cưới làm quà cho cặp đôi cũng trở nên phổ biến.
        <br />
        Cuối cùng, quyết định ai mua nhẫn cưới trong xã hội hiện đại có thể khác
        nhau tùy thuộc vào truyền thống văn hóa, sở thích cá nhân, và cách sắp
        xếp tài chính của mỗi cặp đôi.
      </div>
    ),
  },
  {
    title: "Mua nhẫn cưới ở đâu?",
    content: (
      <div>
        💍 Bạn có thể tìm các cửa hàng trang sức gần mình bằng cách tìm kiếm
        trên Google với từ khóa “nhẫn cưới gần tôi”, “nhẫn cưới cặp gần tôi”
        hoặc “cửa hàng nhẫn cưới gần tôi”. Khi ghé thăm{" "}
        <span>các cửa hàng nhẫn cưới địa phương</span>, bạn có thể thử các kiểu
        nhẫn khác nhau và nhận được lời khuyên chuyên nghiệp từ nhân viên.
        <br />
        💍 Bạn cũng có thể chọn mua nhẫn cưới trực tuyến. Nhiều nhà kim hoàn uy
        tín cung cấp dịch vụ mua nhẫn cưới online. Lợi ích của việc mua nhẫn
        cưới trực tuyến là bạn có thể tìm được sản phẩm có giá trị tốt nhất bằng
        cách duyệt qua các dòng sản phẩm khác nhau, so sánh giá và đọc đánh giá
        từ khách hàng.
        <br />
        💍 Hãy cân nhắc sử dụng trang sức gia truyền làm nhẫn cưới của mình.
        Điều này có thể kết nối bạn với lịch sử và truyền thống gia đình, và là
        một lựa chọn đầy ý nghĩa và tình cảm."
      </div>
    ),
  },
  {
    title: "Ý nghĩa của nhẫn cưới màu đen là gì?",
    content: (
      <div>
        Nhẫn cưới màu đen, ngoài việc thể hiện phong cách và cá tính, còn mang ý
        nghĩa về sự cam kết sâu sắc đối với người bạn đời. Màu đen thường gắn
        liền với sức mạnh, lòng dũng cảm và sự vĩnh cửu, vì vậy đeo nhẫn cưới
        màu đen có thể tượng trưng cho một mối liên kết bền chặt và lâu dài,
        cũng như tinh thần tận tụy với hôn nhân.
      </div>
    ),
  },
  {
    title: "Kim loại nào được sử dụng để làm nhẫn cưới?",
    content: (
      <div>
        Dòng nhẫn cưới bằng vàng đã trở thành lựa chọn ưu tiên nhờ vào độ bền,
        nét cuốn hút vượt thời gian và sắc vàng lấp lánh.{" "}
        <span>Nhẫn cưới vàng</span> thu hút các cặp đôi mong muốn một vẻ ngoài
        sang trọng và mạnh mẽ nhưng vẫn giữ được nét truyền thống.
        <br />
        Bạch kim nổi bật với độ sáng trắng rực rỡ, làm tôn lên vẻ đẹp của kim
        cương một cách tráng lệ. Bạch kim có khả năng chống xỉn màu và ăn mòn
        tuyệt vời, là lựa chọn hàng đầu cho những ai tìm kiếm độ bền lâu dài và
        tính chất không gây dị ứng. Vì tính hiếm có và chất lượng cao,{" "}
        <span>nhẫn cưới Bạch kim</span> thường có giá đắt hơn so với các kim
        loại khác.
        <br />
        Vàng trắng luôn đại diện cho sự thanh lịch và vĩnh cửu, mang lại vẻ
        ngoài gần như tương đồng với bạch kim nhưng ở mức giá phải chăng hơn. Do
        đó, <span>nhẫn cưới vàng trắng</span> được các cặp đôi hiện đại ưa
        chuộng, vì vừa có được kết cấu của vàng vừa có màu sắc và độ sáng của
        bạch kim.
        <br />
        Vàng hồng là một kim loại thời thượng với tông màu ấm áp và lãng mạn,
        mang lại sự độc đáo và tinh tế cho nhẫn cưới. Sắc hồng của vàng hồng
        được tạo ra bằng cách pha trộn vàng với hợp kim đồng, tạo nên vẻ cổ điển
        và dịu dàng. <span>Nhẫn cưới vàng hồng</span> đang trở thành lựa chọn
        phổ biến cho các cặp đôi muốn có biểu tượng tình yêu lãng mạn và độc
        đáo.
      </div>
    ),
  },
  {
    title: "Đeo nhẫn cưới ở tay nào?",
    content: (
      <div>
        💍 Ở nhiều quốc gia phương Tây, bao gồm Hoa Kỳ, Canada và hầu hết các
        nước châu Âu, nhẫn cưới thường được đeo ở ngón áp út của tay trái, còn
        gọi là "ngón đeo nhẫn". Truyền thống này bắt nguồn từ thời cổ đại khi
        người ta tin rằng có một tĩnh mạch ở ngón tay này, gọi là “vena amoris”
        hay “tĩnh mạch tình yêu”, kết nối trực tiếp với trái tim.
        <br />
        💍 Ở một số quốc gia phương Đông, chẳng hạn như Ấn Độ và Pakistan, nhẫn
        cưới thường được đeo ở tay phải. Thói quen này dựa trên các phong tục
        văn hóa và tôn giáo đặc thù của những khu vực này.
        <br />
        💍 Trong một số truyền thống tôn giáo, như Chính Thống giáo, nhẫn cưới
        được đeo ở tay phải trong lễ cưới và sau đó được chuyển sang tay trái
        sau buổi lễ. Sự chuyển đổi này tượng trưng cho sự kết hợp của hai cá
        nhân trong hôn nhân.
      </div>
    ),
  },
  {
    title: "Nhẫn cưới và nhẫn đính hôn có giống nhau không?",
    content: (
      <div>
        Theo truyền thống, <span>nhẫn đính hôn</span> là chiếc nhẫn được trao
        trong lễ cầu hôn, tượng trưng cho ý định kết hôn, trong khi nhẫn cưới là
        chiếc nhẫn mà các cặp đôi trao cho nhau trong lễ cưới, đại diện cho sự
        kết hợp chính thức trong hôn nhân.
        <br />
        Nhẫn đính hôn thường có thiết kế cầu kỳ hơn và thường nổi bật với một
        viên kim cương làm tâm điểm. Nhẫn cưới có thể là những vòng trơn đơn
        giản làm từ kim loại, hoặc được đính kim cương dọc theo vòng nhẫn.
      </div>
    ),
  },
  {
    title: "Đeo nhẫn cưới và nhẫn đính hôn như thế nào?",
    content: (
      <div>
        💍 Chồng Nhẫn: Cách truyền thống nhất để đeo cả nhẫn đính hôn và nhẫn
        cưới là chồng chúng lên cùng một ngón tay. Trong phong cách này, nhẫn
        cưới thường được đeo trước, sau đó là nhẫn đính hôn.
        <br />
        💍 Đeo Ngón Khác: Một số người thích đeo nhẫn đính hôn và nhẫn cưới trên
        các ngón tay khác nhau. Nhẫn đính hôn thường được đeo ở ngón áp út của
        tay trái, trong khi nhẫn cưới được đeo ở ngón áp út của tay phải.
        <br />
        💍 Nhẫn Xen Kẽ hoặc Nhẫn Lồng: Một tùy chọn khác là đeo một nhẫn xen kẽ
        hoặc nhẫn lồng giữa nhẫn đính hôn và nhẫn cưới. Loại nhẫn này thường
        mỏng hơn và có thể được đeo giữa hai chiếc nhẫn để tạo nên vẻ ngoài hài
        hòa và cân đối.
      </div>
    ),
  },
  {
    title: "Vệ sinh nhẫn cưới tại nhà như thế nào?",
    content: (
      <div>
        💍 Chuẩn Bị Dung Dịch Vệ Sinh: Đổ một bát nhỏ nước ấm và thêm vài giọt
        xà phòng rửa chén nhẹ hoặc chất vệ sinh trang sức dịu nhẹ. Tránh sử dụng
        hóa chất mạnh hoặc chất tẩy rửa mài mòn có thể làm hỏng kim loại hoặc đá
        quý của nhẫn cưới.
        <br />
        💍 Ngâm Nhẫn: Đặt nhẫn cưới vào dung dịch vệ sinh và để ngâm khoảng
        10-15 phút. Việc này sẽ giúp làm lỏng bất kỳ bụi bẩn, dầu mỡ hoặc cặn bã
        trên nhẫn.
        <br />
        💍 Nhẹ Nhàng Chải Nhẫn: Sử dụng bàn chải đánh răng mềm hoặc bàn chải
        trang sức để nhẹ nhàng chà nhẫn cưới, chú ý đến những khu vực khó tiếp
        cận và bên dưới bất kỳ viên đá quý nào. Hãy cẩn thận không chà quá mạnh,
        đặc biệt nếu nhẫn cưới của bạn có đá quý mỏng manh hoặc chi tiết tinh
        xảo.
        <br />
        💍 Rửa Sạch: Sau khi chải, rửa nhẫn dưới vòi nước ấm để loại bỏ bất kỳ
        cặn xà phòng nào. Đảm bảo rằng tất cả xà phòng đã được rửa sạch, vì cặn
        sót lại có thể làm mất đi độ sáng của nhẫn cưới.
        <br />
        💍 Lau Khô và Đánh Bóng: Sử dụng một miếng vải mềm, không xơ để nhẹ
        nhàng lau khô nhẫn cưới. Bạn cũng có thể sử dụng vải đánh bóng trang sức
        để tăng thêm độ sáng. Tránh sử dụng khăn giấy hoặc khăn ăn, vì chúng có
        thể để lại sợi vải hoặc xước.
        <br />
        Vệ sinh và bảo trì thường xuyên sẽ giúp nhẫn cưới của bạn luôn giữ được
        vẻ đẹp tốt nhất. Nên vệ sinh nhẫn mỗi vài tuần một lần hoặc bất cứ khi
        nào bạn nhận thấy có bụi bẩn hoặc dầu mỡ tích tụ. Đọc hướng dẫn của
        chúng tôi về <span>Cách Vệ Sinh Nhẫn Kim Cương Tại Nhà</span> để biết
        thêm chi tiết.
      </div>
    ),
  },
];

function WeddingRingsAccordion() {
  return (
    <div className={styles.container}>
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary>
          <div className={styles.mainTitle}>Nhẫn Cưới</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.text}>
            Nhẫn cưới, còn được gọi là nhẫn đính hôn và nhẫn hôn phối, là những
            món trang sức quan trọng được trao đổi trong lễ cưới, tượng trưng
            cho sự gắn kết vĩnh cửu giữa hai người. Các cô dâu hiện đại đang
            chọn nhẫn cưới với những yếu tố thiết kế sáng tạo, kim cương, đá
            quý, và kim loại quý, với kiểu dáng từ đơn giản đến rất tinh xảo.
            Những phong cách và hình thức đa dạng này thể hiện nhiều loại tình
            yêu khác nhau và được sử dụng để kỷ niệm một mối liên kết chân
            thành. <br />
            Tại Couple Rings, bạn xứng đáng có một chiếc nhẫn cưới tỏa sáng rực
            rỡ như câu chuyện tình yêu của bạn. Các chuyên gia trang sức của
            chúng tôi lấy cảm hứng từ{" "}
            <span>những câu chuyện tình yêu cảm động</span> trên toàn thế giới,
            kết hợp giữa yếu tố thời trang và cổ điển để tạo ra bộ nhẫn cưới độc
            đáo, thể hiện cá tính và gu thẩm mỹ của bạn. Chúng tôi cẩn thận chọn
            lựa kim loại 18K chất lượng cao để chế tác nhẫn cưới cho cả nam và
            nữ, bao gồm <span>bạch kim</span>, <span>vàng trắng</span>,{" "}
            <span>vàng thường</span>, và <span>vàng hồng</span>. <br />
            Các kỹ thuật chạm khắc tinh xảo và kỹ năng gắn kết tuyệt vời được áp
            dụng cho mỗi <span>chiếc nhẫn cưới của cặp đôi</span>. Từ những
            chiếc nhẫn trơn đơn giản và nhẫn cưới chồng lên nhau cho đến nhẫn
            vĩnh cửu đính kim cương; từ nhẫn kim cương đính bằng móc cổ điển và
            nhẫn halo cho đến nhẫn kim cương đính theo kiểu pave, mỗi mẫu đều
            được chế tác tỉ mỉ và mỗi viên kim cương đều được đặt một cách chính
            xác. Tay nghề khắt khe của Couple Rings mang lại cho nhẫn cưới của
            bạn sức hấp dẫn nghệ thuật độc đáo, làm cho đôi tay bạn lung linh
            với vẻ đẹp mê hoặc. <br />
            Khám phá bộ sưu tập <span>nhẫn cưới nữ</span> của chúng tôi mà bạn
            chỉ có thể mua cho một người trong suốt cuộc đời để thể hiện sự cam
            kết vững bền của bạn. Nhẫn cưới nữ của chúng tôi được trang trí bằng
            kim cương chất lượng hàng đầu và có những đường cong mềm mại, hoàn
            hảo thể hiện sự thanh lịch và dịu dàng của người phụ nữ. <br />
            Đối với <span>nhẫn cưới nam</span>, các thiết kế của chúng tôi
            thường đơn giản hơn. Bạn có thể chọn nhẫn cưới nam hiện đại và phong
            cách hoặc chọn kiểu dáng có kết cấu hoặc khắc họa tiết.
          </div>
        </AccordionDetails>
      </Accordion>
      {data.map((item, index) => {
        return (
          <Accordion key={index} sx={{ boxShadow: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className={styles.title}>
                {index + 1}. {item.title}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.text}>{item.content}</div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default WeddingRingsAccordion;
