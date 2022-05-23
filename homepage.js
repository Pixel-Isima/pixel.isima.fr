window.addEventListener("load", () => {
    // HACK
    setTimeout(() => {
        let header = document.getElementsByTagName("header")[0];
        let logo_container = document.getElementById("logo");
        let subtitle = document.getElementById("subtitle");
        let space = document.getElementById("space");
        let footer = document.getElementsByTagName("footer")[0];

        let scroll_max = 0;
        let window_height = 0;
        let space_height = 0;
        let scroll_top = 0;

        let heading_height = header.offsetHeight + footer.offsetHeight;
        let logo_height = logo_container.offsetHeight;
    
        subtitle.style.height = "unset";
        space.style.flex = "auto";
        
        let subtitle_height = subtitle.offsetHeight;
    
        init();
    
        function update_parameters(scroll_height) {
            if (scroll_height < scroll_max) {
                let viewport_height = window_height - scroll_height
                let rate = scroll_height / scroll_max;
                let logo_transform = 2 - rate;
    
                header.style.marginTop = scroll_height + "px";
                logo_container.style.height = viewport_height + "px";
                logo_container.style.transform = "scale(" + logo_transform + ")";
                subtitle.style.opacity = 1-2*rate;
                subtitle.style.display = "block";
                subtitle.style.height = subtitle_height * (1 - rate) + "px";
            } else {
                subtitle.style.display = "none";
                logo_container.style.transform = "scale(1);";
                logo_container.style.height = logo_height + "px";
            }
        }
    
        function init() {
            update_parameters(scroll_max);
            window_height = window.innerHeight;
            scroll_max = window_height - logo_height;
            space_height = window_height - heading_height;
            space.style.height = space_height + "px";
            update_parameters(scroll_top);
        }
    
        update_parameters(0);
        document.body.onscroll = (evt) => {
            scroll_top = evt.target.scrollingElement.scrollTop;
    
            update_parameters(scroll_top);
        };
        window.addEventListener("resize", () => {
            init();
            scroll_top = evt.target.scrollingElement.scrollTop;
            update_parameters(scroll_top);
        })
    }, 100);
});