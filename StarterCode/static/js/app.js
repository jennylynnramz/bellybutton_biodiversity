// Use the D3 library to read in samples.json.
d3.json("samples.json").then(function(data) {
    
    //creating name and sample set objects from the json array
    var sample_set = data.samples;
    var uniqueBellybutton = data.names
    var quantBellyButtons = uniqueBellybutton.length
    var dropdown = document.getElementById("bellybutton-select");
    
    // Loop through the array
    for (var i = 0; i < quantBellyButtons; ++i) {
      // Append the element to the end of Array list
      dropdown[dropdown.length] = new Option(uniqueBellybutton[i], uniqueBellybutton[i]);
    }
    ////end bellybutton dropdown
    
    }); // end of d3.json. probably shouldn't even think about touching

function optionChanged(){
    var e = document.getElementById("bellybutton-select");
    var result = e.options[e.selectedIndex].text;
    // console.log(result) 


    //=====

    d3.json("samples.json").then(function(data) {
        
        //creating name and sample set objects from the json array
        var sample_set = data.samples;
        var metadata_set = data.metadata;
        // var sample_metadata = date.metadata
            for (var i = 0; i < sample_set.length; i++) {
                // console.log(i)
                filteredID = sample_set[i]["id"];
                console.log(sample_set[i]["id"]);
                if (filteredID === result) { 
                    console.log(sample_set[i])
                    console.log(sample_set[i]["sample_values"])

                      //sample_value
                    var filtered_sample_values = []
                    for (var j=0; !(j > sample_set[i].length) && (j < 10) ; j++) {
                      // console.log(sample_set[i]["sample_value"])
                      filtered_sample_values.push(sample_set[i]["sample_values"][j])
                    }  
                    console.log("filtered_sample_values", filtered_sample_values)

                      //otu_id
                    var filtered_otu_ids = []
                    for (var k = 0; !(k > sample_set[i].length) && (k < 10 ); k++) {
                      // console.log(sample_set[i]["otu_ids"])
                      filtered_otu_ids.push(sample_set[i]["otu_ids"][k])
                    }
                    console.log("filtered_otu_ids", filtered_otu_ids)
                    var filtered_otu_ids_OTU_added = filtered_otu_ids.map(otu => ("OTU " + otu));
                    console.log(filtered_otu_ids_OTU_added)

                      //otu_labels
                    var filtered_otu_labels = []
                    for (var m = 0; !(m > sample_set[i].length) && (m < 10) ; m++) {
                      // console.log(sample_set[i]["otu_labels"])
                      filtered_otu_labels.push(sample_set[i]["otu_labels"][m])
                    } 
                    console.log("filtered_otu_labels", filtered_otu_labels)
                    

                    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
                    // Use sample_values as the values for the bar chart.
                    // Use otu_ids as the labels for the bar chart.
                    // Use otu_labels as the hovertext for the chart

                    var data_bar = [{
                        type: 'bar',
                        y: filtered_otu_ids_OTU_added,
                        x: filtered_sample_values,
                        text: filtered_otu_labels,
                        name: filtered_otu_labels,                      
                        orientation: 'h'
                      }];

                    var bar_layout = {
                        title: `Bellybutton ${filteredID}`,
                        font:{
                          family: 'Raleway, sans-serif'
                        },
                        showlegend: false
                    };
                      
                    Plotly.newPlot('bar', data_bar, bar_layout);
                  
                    //bubble chart
                    //Create a bubble chart that displays each sample.
                    // Use otu_ids for the x values.
                    // Use sample_values for the y values.
                    // Use sample_values for the marker size.
                    // Use otu_ids for the marker colors.
                    // Use otu_labels for the text values.

                    var bubble_trace = {
                      x: filtered_otu_ids_OTU_added,
                      y: filtered_sample_values,
                      text: filtered_otu_labels,
                      mode: 'markers',
                      marker: {
                        size: filtered_sample_values,
                        color: filtered_otu_ids
                      }
                    };
                    
                    var bubble_data = [bubble_trace];
                    
                    var bubble_layout = {
                      title: `Bellybutton ${filteredID}`,
                      showlegend: false,
                      height: 600,
                      width: 1200
                    };
                    
                    Plotly.newPlot('bubble', bubble_data, bubble_layout);

                    //guage data here, eventually


                    break

                }//end of IF loop.

            } //end of sample_set FOR loop
/////////////////////////////////////////
          console.log(metadata_set.length)
          // console.log(metadata_set)
          var metadata_result = parseInt(result)
          for (var n = 0; n < metadata_set.length; n++) {
            //connecting the id from the metadata
            var filtered_metadata_ID = metadata_set[n]["id"];
            // console.log(metadata_set[n]["id"]);
            //if loop
            console.log(metadata_result) 
            console.log(filtered_metadata_ID)

              if (filtered_metadata_ID === metadata_result) { 
                // console.log(metadata_set[n])
                console.log("Demographic Data:")
                console.log(metadata_set[n]["id"])
                console.log(metadata_set[n]["ethnicity"])
                console.log(metadata_set[n]["gender"])
                console.log(metadata_set[n]["age"])
                console.log(metadata_set[n]["location"])
                console.log(metadata_set[n]["bbtype"])
                console.log(metadata_set[n]["wfreq"])
                console.log("conditions met. breaking now!")

                var demographics = document.createElement("P");                 // Create a <p> element
                demographics.innerHTML = `ID: ${metadata_set[n]["id"]} <br>
                                          Ethnicity: ${metadata_set[n]["ethnicity"]} <br>
                                          Gender: ${metadata_set[n]["gender"]} <br>
                                          Age: ${metadata_set[n]["age"]}<br>
                                          Location: ${metadata_set[n]["location"]}<br>
                                          Bellybutton Type: ${metadata_set[n]["bbtype"]}<br>
                                          Wash Frequency: ${metadata_set[n]["wfreq"]}<br>`;                
                document.getElementById("sample-metadata").appendChild(demographics);
                
                /////gauge graph of wfrew
                var gauge_data = [
                  {
                    // domain: { x: [0, 10], y: [0, 10] },
                    value: metadata_set[n]["wfreq"],
                    title: { text: "Washing Frequency" },
                    type: "indicator",
                    mode: "gauge+number"
                  }
                ];
                
                var gauge_layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

                Plotly.newPlot('gauge', gauge_data, gauge_layout);





                break

              } //end of metadata IF loop

            } //end of metadata FOR loop
        


         
        }); //end of d3

      




} // end of function optionchanged












