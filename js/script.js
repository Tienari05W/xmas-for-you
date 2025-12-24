$(document).ready(function () {

  const words = ["HOHO", "BÉ", "<br>", "CLICK", "VÀO", "<br>", "CÂY", "THÔNG", "ĐI"];
  let i = 0;
  let typingTimer;

  function typeWords() {
    if (i < words.length) {
      $("#speechText").append(words[i] + " ");
      i++;
      typingTimer = setTimeout(typeWords, 300);
    }
  }


  function startTreeGlow() {
    const tree = document.getElementById("tree");
    const container = document.querySelector(".tree-bg");

    const treeRect = tree.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();


    const centerX =
      treeRect.left - parentRect.left + treeRect.width * 0.21;

    const centerY =
      treeRect.top - parentRect.top + treeRect.height * 0.10;

    const sparkles = [];

    for (let j = 0; j < 16; j++) {
      const s = document.createElement("div");
      s.className = "sparkle";

      s.angle = Math.random() * Math.PI * 2;
      s.radius = Math.random() * 40 + 30;
      s.speed = Math.random() * 0.018 + 0.012;

      container.appendChild(s);
      sparkles.push(s);
    }

    function animate() {
      sparkles.forEach(s => {
        s.angle += s.speed;
        s.radius += Math.sin(s.angle * 3) * 0.3;

        const x = centerX + Math.cos(s.angle) * s.radius;
        const y = centerY + Math.sin(s.angle) * s.radius;

        s.style.left = x + "px";
        s.style.top = y + "px";
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  $("#tree").one("click", function () {
    clearTimeout(typingTimer);
    $("#santa-speech").stop(true, true).fadeOut(300);
    $("#speechText").html("");
    $("#gift").addClass("show");

  });

  // Click quà:
  let giftClicks = 0;

  $("#gift").on("click", function () {
    console.log("CLICK GIFT");
    giftClicks++;

    $(this).addClass("bounce");
    setTimeout(() => $(this).removeClass("bounce"), 200);

    if (giftClicks === 3) {
      explodeGift();
    }
  });

  // pháo hoa:
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  let fireworks = [];
  let particles = [];
  let fwTimer;

  function launchFirework() {
    fireworks.push({
      x: canvas.width / 2,
      y: canvas.height + 10,
      vx: 0,
      vy: -(9 + Math.random() * 2),
      exploded: false,
      colorHue: Math.random() * 360
    });
  }


  function explode(x, y, hue) {
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.random() * 3 + 2,
        colorHue: hue
      });
    }
  }

  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    fireworks.forEach((f, i) => {
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.05; // gravity

      ctx.beginPath();
      ctx.arc(f.x, f.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${f.colorHue},100%,60%)`;
      ctx.fill();

      // khi rocket bắt đầu rơi → nổ
      if (f.vy >= 0 && !f.exploded) {
        explode(f.x, f.y + 250, f.colorHue);
        fireworks.splice(i, 1);
      }
    });


    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.alpha -= 0.006;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);

      ctx.shadowBlur = 28;
      ctx.shadowColor = `hsl(${p.colorHue},100%,60%)`;
      ctx.fillStyle = `hsla(${p.colorHue},100%,60%,${p.alpha})`;
      ctx.fill();

      ctx.shadowBlur = 0;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    });

    requestAnimationFrame(animateFireworks);
  }

  function startFireworks() {
    canvas.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    fwTimer = setInterval(launchFirework, 500);
    animateFireworks();
  }

  function stopFireworks() {
    clearInterval(fwTimer);
    fireworks = [];
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
  }


  // Nổ quà:
  const fireSound = document.getElementById("fireSound");
  fireSound.volume = 0.6;

  function explodeGift() {
    $("#gift").addClass("explode");


    fireSound.currentTime = 0;
    fireSound.play().catch(() => { });

    startFireworks();

    setTimeout(() => {
      stopFireworks();
      showLetter();
    }, 6800);
  }
  const letterMessage = ` Merry Christmas Phương Trang! 
Biết sao mấy nay chị bận chưa, chị làm món quà này tặng cho em đó.
Chúc em giáng sinh vui vẻ, thật là hạnh phúc, luôn may mắn.

Chưa có cơ hội gặp em, nên chị chỉ có thể làm quà như này thôi,
chị hy vọng em sẽ thích và có thể làm em cười.

Chị cảm ơn em rất nhiều, chưa thấy ai có phước như chị năm nay gặp đủ thứ chuyện hết trơn.
Tưởng không vui vẻ lại được luôn, nhưng mà vô tình một cô bé đáng iu, xinh đẹp như em lại xuất hiện.

Chúc mọi điều tốt đẹp nhất sẽ đến với em.
Đừng có thức khuya nữa nha, bác sĩ cũng có thể bị bệnh đó.
Và chị mong là sắp tới mình sẽ có cơ hội gặp nhau và chị có thể yêu em nhiều hơn nữa.

Giáng sinh an lành!

- Tiên Nguyễn -`;
  function showLetter() {
    $("#letter").fadeIn(600, function () {
      typeLetter(letterMessage, "letterText", 45);
    });
  }

  function typeLetter(text, elementId, speed) {
    let index = 0;
    $("#" + elementId).html("");

    function typing() {
      if (index < text.length) {
        $("#" + elementId).append(text.charAt(index));
        index++;
        setTimeout(typing, speed);
      }
    }

    typing();
  }

  $("#continueBtn").on("click", function () {
    $("#loveModal").fadeIn();
  });

  $("#noBtn").on("mouseenter", function () {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;

    $(this).css({
      transform: `translate(${x}px, ${y}px)`
    });
  });

  $("#yesBtn").on("click", function () {
    $("#loveModal").fadeOut();
    $("#continueBtn").hide();


    $("#loveOutside").fadeIn();
    const music = document.getElementById("bg-music");
    music.volume = 0.25;

    setTimeout(() => {

      $("#loveOutside").fadeOut(2000);

      setTimeout(() => {
        startNightScene();


        setTimeout(() => {
          startFinalScene();
        }, 2500);

      }, 2000);

    }, 9000);
  });

  function createStars(count = 60) {
    const sky = document.getElementById("starSky");
    sky.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";

      star.style.left = Math.random() * 100 + "vw";
      star.style.top = Math.random() * 100 + "vh";
      star.style.animationDuration = 4 + Math.random() * 6 + "s";
      star.style.animationDelay = Math.random() * 5 + "s";

      sky.appendChild(star);
    }
  }

  function startNightScene() {
    $("#nightOverlay").fadeIn(2500);
    createStars();

    $("#finalScene").show();
  }

  const finalLines = [
    "Yêu em",
    "Em là món quà tuyệt vời nhất",
    "Những điều hạnh phúc sẽ đến với em",
    "Và nhớ rằng…"
  ];

  function startFinalScene() {
    console.log("FINAL SCENE STARTED");
    $("#finalScene").fadeIn(1500);

    let i = 0;

    function showLine() {
      if (i < finalLines.length) {
        $("#finalText")
          .stop(true, true)
          .css("opacity", 0)
          .text(finalLines[i])
          .fadeTo(1200, 1)
          .delay(3000)
          .fadeOut(1200, () => {
            i++;
            showLine();
          });
      } else {
        showForeverLove();
      }
    }

    showLine();
  }
  function shootMeteor() {
    const star = document.createElement("div");
    star.className = "shooting-star";

    // random điểm bắt đầu trên trời
    star.style.top = Math.random() * 35 + "vh";
    star.style.left = Math.random() * 50 + "vw";

    document.getElementById("finalScene").appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 3200);
  }

  function meteorShowerSoft() {
    let count = 0;
    const timer = setInterval(() => {
      shootMeteor();
      count++;
      if (count >= 6) clearInterval(timer);
    }, 700);
  }

  function meteorShowerStrong() {
    let count = 0;
    const timer = setInterval(() => {
      shootMeteor();
      shootMeteor();
      count++;
      if (count >= 8) clearInterval(timer);
    }, 500);
  }

  function showForeverLove() {
    $("#loveForever").fadeIn(1500);


    setTimeout(meteorShowerSoft, 2000);


    setTimeout(meteorShowerStrong, 6000);

    fadeOutEnding();
  }

  function fadeOutEnding() {
    const music = document.getElementById("bg-music");

    let vol = music.volume;

    const fadeAudio = setInterval(() => {
      if (vol > 0.02) {
        vol -= 0.02;
        music.volume = vol;
      } else {
        clearInterval(fadeAudio);
      }
    }, 300);

    setTimeout(() => {
      $("#finalScene").fadeOut(4000);
    }, 12000);
  }

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    let name = $("#fullname").val().trim();
    let pass = $("#password").val().trim();
    let ok = true;

    $("#errName").text("");
    $("#errPass").text("");

    if (name === "") {
      $("#errName").text("Vui lòng nhập họ tên đầy đủ");
      ok = false;
    } else if (name !== "Lê Phương Trang") {
      $("#errName").text("Sorry, Next giùm chị đi cưng!");
      ok = false;
    }

    if (pass !== "2512") {
      $("#errPass").text("Mật khẩu là ngày giáng sinh");
      ok = false;
    }

    if (!ok) return;


    const music = document.getElementById("bg-music");
    music.volume = 0.4;
    music.play();


    $("#login-screen").addClass("hide");
    $("#tree-screen").addClass("active");


    setTimeout(startTreeGlow, 800);

    i = 0;
    $("#speechText").html("");


    setTimeout(function () {
      $("#santa-speech").fadeIn();
      typeWords();
    }, 2000);
  });

});
