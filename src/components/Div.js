// eslint-disable-next-line
export default props => (
  <div id={props.block.id} className={props.block.className} style={props.block.styles}>
    {props.block.children}
</div>
)