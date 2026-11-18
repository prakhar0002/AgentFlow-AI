const $ = id => document.getElementById(id);
const agents = [
  {id:"planner",name:"Planner Agent",desc:"Analyzing objective and creating task sequence"},
  {id:"research",name:"Research Agent",desc:"Gathering relevant context and requirements"},
  {id:"execute",name:"Execution Agent",desc:"Building the requested deliverables"},
  {id:"review",name:"Review Agent",desc:"Checking clarity, feasibility, and completeness"}
];
let completed = 0, running = false, latestOutput = "";
$("taskInput").addEventListener("input",e=>$("charCount").textContent=e.target.value.length+" / 500");
document.querySelectorAll(".example").forEach(b=>b.addEventListener("click",()=>{$("taskInput").value=b.dataset.task;$("charCount").textContent=b.dataset.task.length+" / 500";}));
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function makePlan(task){
 const t=task.toLowerCase();
 let domain="the requested project", focus="the intended audience and desired outcome";
 if(/market|social|bakery|brand|content|campaign/.test(t)){domain="the marketing campaign";focus="customer segments, brand message, and suitable channels";}
 else if(/event|college|tech|fest|workshop/.test(t)){domain="the event";focus="attendees, logistics, team responsibilities, and timeline";}
 else if(/research|business|customer|support/.test(t)){domain="the business research task";focus="the current challenge, practical opportunities, and measurable improvements";}
 else if(/study|exam|learn|course/.test(t)){domain="the learning plan";focus="the learner's current level, learning outcomes, and available time";}
 const words=task.trim().replace(/[.!?]+$/,"");
 return {
  summary:`A structured plan for ${domain}, based on this objective: “${words}.”`,
  research:[`Clarify the main outcome and success criteria.`,`Identify ${focus}.`,`List assumptions, constraints, and information still needed.`],
  actions:[`Convert the objective into 3–5 manageable work packages.`,`Prioritize high-impact tasks and assign a clear owner or next action.`,`Create the first deliverable: a checklist, outline, schedule, or action plan.`,`Set a simple progress measure and a review point.`],
  risks:[`The objective may need more specific scope or deadlines.`,`Validate assumptions with real data before acting.`,`Review the plan with the people responsible for execution.`],
  next:`Start with the highest-priority action, confirm the missing details, and review progress against the stated outcome.`
 };
}
function outputHtml(p){return `<h4>Objective summary</h4><p>${escapeHtml(p.summary)}</p><h4>Research findings & context</h4><ul>${p.research.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><h4>Execution checklist</h4><ul>${p.actions.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><h4>Quality review & risks</h4><ul>${p.risks.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><h4>Recommended next step</h4><p>${escapeHtml(p.next)}</p>`;}
function delay(ms){return new Promise(r=>setTimeout(r,ms));}
async function run(){
 const task=$("taskInput").value.trim();
 if(!task){$("taskInput").focus();$("runStatus").textContent="Please enter an objective";return;}
 if(running)return; running=true;$("runBtn").disabled=true;$("runBtn").innerHTML="<span>✦</span> Agents working…";
 $("resultBox").hidden=true;$("progressBar").style.width="0%";$("runStatus").textContent="Workflow in progress";
 $("timeline").innerHTML=agents.map((a,i)=>`<div class="timeline-step" id="step-${a.id}"><span class="step-num">STEP 0${i+1}</span><b>${a.name}</b><small>Waiting to start</small></div>`).join("");
 agents.forEach(a=>{$("state-"+a.id).textContent="Ready";$("state-"+a.id).className="agent-state";});
 let plan;
 for(let i=0;i<agents.length;i++){
  const a=agents[i], step=$("step-"+a.id), state=$("state-"+a.id);
  step.classList.add("active");step.querySelector("small").textContent=a.desc;
  state.textContent="Working";state.className="agent-state active";
  $("progressBar").style.width=((i)/4*100)+"%";
  await delay(1050);
  if(i===0) plan=makePlan(task);
  if(i===2) latestOutput=outputHtml(plan);
  step.classList.remove("active");step.classList.add("done");step.querySelector("small").textContent="Completed";
  state.textContent="Complete";state.className="agent-state done";
  $("progressBar").style.width=((i+1)/4*100)+"%";
 }
 $("resultContent").innerHTML=latestOutput;$("resultBox").hidden=false;
 $("runStatus").textContent="Workflow completed successfully";completed++;$("completedCount").textContent=completed;
 $("runBtn").disabled=false;$("runBtn").innerHTML="<span>✦</span> Run agent workflow <span class='arrow'>→</span>";
 running=false;
}
$("runBtn").addEventListener("click",run);
$("copyBtn").addEventListener("click",async()=>{
 const text=$("resultContent").innerText;
 try{await navigator.clipboard.writeText(text);$("copyBtn").textContent="Copied ✓";setTimeout(()=>$("copyBtn").textContent="Copy output ↗",1500);}
 catch(e){$("copyBtn").textContent="Select and copy";}});
$("templatesNav").addEventListener("click",()=>document.querySelector(".task-panel").scrollIntoView({behavior:"smooth"}));
$("historyNav").addEventListener("click",()=>document.querySelector(".execution-panel").scrollIntoView({behavior:"smooth"}));
