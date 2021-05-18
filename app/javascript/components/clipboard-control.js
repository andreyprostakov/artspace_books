$(() => {
  $('body').on('click', '[data-clipboard-trigger]', (e) => {
    e.preventDefault()
    content = $(e.target).data('content')
    $buffer = $('<input type="text"/>')

    $('body').append($buffer)
    $buffer.val(content).select()
    document.execCommand('copy')
    $buffer.remove()
  })
});
