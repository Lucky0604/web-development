<template>
  <div class="main wrap clearfix">
    <div class="main-left">
      <div class="card card-answer">
        <div class="answer-content">
          <h3 class="about-title">About author</h3>
          <div class="flex-item">
            <div class="flex-label">Name:</div>
            <div class="flex-content">Lucky</div>
          </div>
          <div class="flex-item">
            <div class="flex-label">Age:</div>
            <div class="flex-content">27</div>
          </div>
          <div class="flex-item">
            <div class="flex-label">Job:</div>
            <div class="flex-content">Frontend Developer</div>
          </div>
          <div class="flex-item">
            <div class="flex-label">Github:</div>
            <div class="flex-content"><a href="https://github.com/lucky0604" target="_blank">@Lucky</a></div>
          </div>
          <div class="flex-item">
            <div class="flex-label">Skills:</div>
            <div class="flex-content">
              <ul class="about-ul">
                <li>Javascript</li>
                <li>Python</li>
                <li>Nodejs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-right">
      <trending :trending="trending"></trending>
    </div>
  </div>
</template>

<script>
</script>