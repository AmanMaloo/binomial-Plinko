function getTargetSinkIndex() {
    let sink_index = 0 ;
    for (let i = 0 ; i < 16 ; i++) {
        toss = Math.random()
        if(toss > 0.5) sink_index++;
    }
    return sink_index;
}
