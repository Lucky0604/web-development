<template>
  <div>
    <div class="panel">
      <div class="panel-heading" role="tab" id="headingSide">
        <a href="#collapseSide" class="collapsed" data-toggle="collapse" aria-expanded="false" aria-controls="collapseSide">
          Item 1
        </a>
      </div>
      <div class="panel-collapse collapse" id="collapseSide" role="tabpanel" arialabelledby="headingSide">
        <div class="panel-body">
          <div class="btn-group-vertical">
            <a href="#" class="btn btn-raised">Children item 1</a>
            <a href="#" class="btn btn-raised">Children item 2</a>
            <a href="#" class="btn btn-raised">Children item 3</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css">
</style>
